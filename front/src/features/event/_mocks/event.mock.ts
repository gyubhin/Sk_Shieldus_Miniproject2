import { http, HttpResponse } from "msw";
import { mswUtils } from "@/libs/msw";
import dayjs from "dayjs";
import type { EventAttendee, EventItem } from "../_types/base";
import type { GetEventsAttendeesResponse } from "../_types/response";
import type { PatchAttendeeStatusBody } from "../_types/body";

let eventData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `일정이름${i + 1}`,
  eventDate: dayjs().format("YYYY.MM.DD"),
  maxAttendees: 12,
})) as EventItem[];

// 더미 참석자/대기자 데이터
const attendeesMock: Record<number, GetEventsAttendeesResponse> = {
  1: [
    { userId: 1, username: "홍길동", role: "OWNER", status: "APPROVED" },
    { userId: 2, username: "김철수", role: "MEMBER", status: "APPROVED" },
    { userId: 3, username: "이영희", role: "MEMBER", status: "WAITING" },
    { userId: 4, username: "박민수", role: "MEMBER", status: "WAITING" },
  ],
  2: [
    { userId: 5, username: "최주영", role: "OWNER", status: "APPROVED" },
    { userId: 6, username: "한소라", role: "MEMBER", status: "APPROVED" },
    { userId: 7, username: "오지훈", role: "MEMBER", status: "WAITING" },
  ],
};

export const eventHandlers = [
  // 일정 목록 조회
  http.get(mswUtils.getUrl("/groups/:groupId/events"), ({ request }) => {
    const page = Number(mswUtils.getParams(request, "page") ?? 0); // 기본값 0
    const size = Number(mswUtils.getParams(request, "size") ?? 10); // 기본값 10

    const start = page * size;
    const end = start + size;
    const items = eventData.slice(start, end);

    return HttpResponse.json(
      {
        content: items,
        page,
        size,
        totalElements: eventData.length,
        totalPages: Math.ceil(eventData.length / size),
        last: end >= eventData.length,
      },
      { status: 200 },
    );
  }),

  // 참석자 목록 조회
  http.get(mswUtils.getUrl("/events/:eventId/attendees"), ({ params }) => {
    const { eventId } = params;
    const data = attendeesMock[Number(eventId)] ?? [];

    return HttpResponse.json(data, { status: 200 });
  }),

  // 일정 참석 (참가 신청)
  http.post(mswUtils.getUrl("/events/:eventId/attendees"), async ({ params }) => {
    const { eventId } = params;
    const eid = Number(eventId);

    if (!attendeesMock[eid]) attendeesMock[eid] = [];

    // 더미 유저 (로그인한 유저라고 가정)
    const newUser: EventAttendee = {
      userId: Date.now(),
      username: "신규참가자",
      role: "MEMBER",
      status:
        attendeesMock[eid].filter((u) => u.status === "APPROVED").length < 5
          ? "APPROVED"
          : "WAITING",
    };

    attendeesMock[eid].push(newUser);

    return HttpResponse.json({ message: "참석 신청 성공" }, { status: 201 });
  }),

  // 일정 취소 (참석자 취소)
  http.delete(mswUtils.getUrl("/events/:eventId/attendees"), ({ params }) => {
    const { eventId } = params;
    const eid = Number(eventId);

    if (!attendeesMock[eid]) attendeesMock[eid] = [];

    // 더미 유저 ID = 999 라고 가정하고 취소 처리
    attendeesMock[eid] = attendeesMock[eid].filter((u) => u.userId !== 999);

    return HttpResponse.json({ message: "참석 취소 성공" }, { status: 200 });
  }),

  // 참석자 상태 변경 (관리자/주최자 권한)
  http.patch(mswUtils.getUrl("/events/:eventId/attendees/:userId"), async ({ params, request }) => {
    const { eventId, userId } = params;
    const body = (await request.json()) as PatchAttendeeStatusBody;

    const eid = Number(eventId);
    const uid = Number(userId);

    if (!attendeesMock[eid]) attendeesMock[eid] = [];

    attendeesMock[eid] = attendeesMock[eid].map((u) =>
      u.userId === uid
        ? {
            ...u,
            status:
              body.status === "GOING"
                ? "APPROVED"
                : body.status === "WAITING"
                  ? "WAITING"
                  : u.status, // CANCELLED은 제외 처리해야 할 수도 있음
          }
        : u,
    );

    // CANCELLED 요청이면 아예 배열에서 제거
    if (body.status === "CANCELLED") {
      attendeesMock[eid] = attendeesMock[eid].filter((u) => u.userId !== uid);
    }

    return HttpResponse.json({ message: "참석자 상태 변경 성공" }, { status: 200 });
  }),
];
