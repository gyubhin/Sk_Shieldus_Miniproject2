import { http, HttpResponse } from "msw";
import { mswUtils } from "@/libs/msw";
import dayjs from "dayjs";
import type { EventItem } from "../_types/base";

let eventData = Array.from({ length: 124 }, (_, i) => ({
  id: i + 1,
  title: `일정이름${i + 1}`,
  eventDate: dayjs().format("YYYY.MM.DD"),
  maxAttendees: 12,
})) as EventItem[];

export const eventHandlers = [
  // 일정 목록 조회
  http.get(mswUtils.getUrl("/groups/:groupId/events"), ({ request }) => {
    const page = Number(mswUtils.getParams(request, "page") ?? 0); // 기본값 0
    const size = Number(mswUtils.getParams(request, "size") ?? 10); // 기본값 10

    // 1. 페이징 처리
    const start = page * size;
    const end = start + size;
    const items = eventData.slice(start, end);

    // 2. 응답
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
];
