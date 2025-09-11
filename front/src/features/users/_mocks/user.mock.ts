import { http, HttpResponse } from "msw";
import { mswUtils } from "@/libs/msw";
import dayjs from "dayjs";
import type { GroupsItem } from "@/features/group/_types/base";

let dummyData = Array.from({ length: 124 }, (_, i) => ({
  id: i + 1,
  name: `모임이름${i + 1}`,
  description: `모임설명${i + 1}`,
  imageUrl: "https://placehold.co/600x400",
  region: `서울`,
  maxMembers: 12,
  currentMembers: 10,
  ownerId: 1,
  ownerNickname: `주인장${i + 1}`,
  categoryId: i + 1,
  categoryName: `카테고리${i + 1}`,
  createdAt: dayjs().format("YYYY.MM.DD"),
  updatedAt: dayjs().format("YYYY.MM.DD"),
})) as GroupsItem[];

export const userHandlers = [
  // 내 모임 조회 api
  http.get(mswUtils.getUrl("/users/me/groups"), ({ request }) => {
    const page = Number(mswUtils.getParams(request, "page") ?? 0); // 기본값 0
    const size = Number(mswUtils.getParams(request, "size") ?? 10); // 기본값 10

    // 1. 페이징 처리
    const start = page * size;
    const end = start + size;
    const items = dummyData.slice(start, end);

    // 2. 응답
    return HttpResponse.json(
      {
        content: items,
        page,
        size,
        totalElements: dummyData.length,
        totalPages: Math.ceil(dummyData.length / size),
        last: end >= dummyData.length,
      },
      { status: 200 },
    );
  }),

  // 회원정보 수정 api
  http.patch(mswUtils.getUrl("/users/me"), async ({ request }) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  // 회원 탈퇴 api
  http.delete(mswUtils.getUrl("/users/me"), () => {
    return HttpResponse.json(undefined, { status: 200 });
  }),
];
