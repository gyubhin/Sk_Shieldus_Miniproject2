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
  1: {
    confirmed: [
      { userId: 1, nickname: "홍길동", role: "OWNER" },
      { userId: 2, nickname: "김철수", role: "MEMBER" },
    ],
    waiting: [
      { userId: 3, nickname: "이영희", role: "MEMBER" },
      { userId: 4, nickname: "박민수", role: "MEMBER" },
    ],
  },
  2: {
    confirmed: [
      { userId: 5, nickname: "최주영", role: "OWNER" },
      { userId: 6, nickname: "한소라", role: "MEMBER" },
    ],
    waiting: [{ userId: 7, nickname: "오지훈", role: "MEMBER" }],
  },
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
    const data = attendeesMock[Number(eventId)] ?? { confirmed: [], waiting: [] };

    return HttpResponse.json(data, { status: 200 });
  }),

  // 일정 참석 (참가 신청)
  http.post(mswUtils.getUrl("/events/:eventId/attendees"), async ({ params }) => {
    const { eventId } = params;
    const eid = Number(eventId);

    // 더미 유저 (로그인한 유저라고 가정)
    const newUser = { userId: Date.now(), nickname: "신규참가자", role: "MEMBER" } as EventAttendee;

    if (!attendeesMock[eid]) attendeesMock[eid] = { confirmed: [], waiting: [] };

    // 임시 로직: 정원 다 안 찼으면 confirmed, 아니면 waiting
    if (attendeesMock[eid].confirmed.length < 5) {
      attendeesMock[eid].confirmed.push(newUser);
    } else {
      attendeesMock[eid].waiting.push(newUser);
    }

    return HttpResponse.json({ message: "참석 신청 성공" }, { status: 201 });
  }),

  // 일정 취소 (참석자 취소)
  http.delete(mswUtils.getUrl("/events/:eventId/attendees"), ({ params }) => {
    const { eventId } = params;
    const eid = Number(eventId);

    if (!attendeesMock[eid]) attendeesMock[eid] = { confirmed: [], waiting: [] };

    // 더미 유저 ID = 999 라고 가정하고 취소 처리
    attendeesMock[eid].confirmed = attendeesMock[eid].confirmed.filter((u) => u.userId !== 999);
    attendeesMock[eid].waiting = attendeesMock[eid].waiting.filter((u) => u.userId !== 999);

    return HttpResponse.json({ message: "참석 취소 성공" }, { status: 200 });
  }),

  // 참석자 상태 변경 (관리자/주최자 권한)
  http.patch(mswUtils.getUrl("/events/:eventId/attendees/:userId"), async ({ params, request }) => {
    const { eventId, userId } = params;
    const body = (await request.json()) as PatchAttendeeStatusBody;

    const eid = Number(eventId);
    const uid = Number(userId);

    if (!attendeesMock[eid]) attendeesMock[eid] = { confirmed: [], waiting: [] };

    // 해당 유저 찾기
    let user =
      attendeesMock[eid].confirmed.find((u) => u.userId === uid) ||
      attendeesMock[eid].waiting.find((u) => u.userId === uid);

    // 목록에서 제거
    attendeesMock[eid].confirmed = attendeesMock[eid].confirmed.filter((u) => u.userId !== uid);
    attendeesMock[eid].waiting = attendeesMock[eid].waiting.filter((u) => u.userId !== uid);

    if (body.status === "GOING") {
      if (user) attendeesMock[eid].confirmed.push(user);
    } else if (body.status === "WAITING") {
      if (user) attendeesMock[eid].waiting.push(user);
    }
    // CANCELLED이면 아예 제외

    return HttpResponse.json({ message: "참석자 상태 변경 성공" }, { status: 200 });
  }),
];
