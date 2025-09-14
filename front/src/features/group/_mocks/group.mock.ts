import { http, HttpResponse } from "msw";
import type { GroupsItem } from "../_types/base";
import { mswUtils } from "@/libs/msw";
import dayjs from "dayjs";

let groupData = Array.from({ length: 124 }, (_, i) => ({
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

export const groupHandlers = [
  http.get(mswUtils.getUrl("/groups"), ({ request }) => {
    const page = Number(mswUtils.getParams(request, "page") ?? 0); // 기본값 0
    const size = Number(mswUtils.getParams(request, "size") ?? 10); // 기본값 10
    const search = mswUtils.getParams(request, "search"); // 기본값 10

    // 1. 검색어 필터링 (name, description, ownerNickname, categoryName 중 포함 여부 확인)
    let filtered = groupData;
    if (search?.trim()) {
      const keyword = search.toLowerCase();
      filtered = groupData.filter(
        (g) =>
          g.name.toLowerCase().includes(keyword) ||
          // g.description.toLowerCase().includes(keyword) ||
          // g.ownerNickname.toLowerCase().includes(keyword) ||
          g.categoryName.toLowerCase().includes(keyword),
      );
    }

    // 2. 페이징 처리
    const start = page * size;
    const end = start + size;
    const items = filtered.slice(start, end);

    // 3. 응답
    return HttpResponse.json(
      {
        content: items,
        page,
        size,
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / size),
        last: end >= filtered.length,
      },
      { status: 200 },
    );
  }),

  // 모임 등록 api
  http.post(mswUtils.getUrl("/groups"), async ({ request }) => {
    // 요청 body 파싱 (MSW v2에서는 request.json() 가능)
    const body = (await request.json()) as Partial<GroupsItem>;

    const newGroup: GroupsItem = {
      id: groupData.length + 1, // auto-increment
      name: body.name ?? `새 모임 ${groupData.length + 1}`,
      description: body.description ?? "",
      imageUrl: body.imageUrl ?? "https://placehold.co/600x400",
      region: body.region ?? "서울",
      maxMembers: body.maxMembers ?? 10,
      currentMembers: 1,
      ownerId: body.ownerId ?? 1,
      ownerNickname: body.ownerNickname ?? "주인장",
      categoryId: body.categoryId ?? 1,
      categoryName: body.categoryName ?? "카테고리",
      tags: "코코",
      liked: false,
      joined: false,
      createdAt: dayjs().format("YYYY.MM.DD"),
      updatedAt: dayjs().format("YYYY.MM.DD"),
    };

    groupData.unshift(newGroup);

    return HttpResponse.json(newGroup, { status: 201 });
  }),
];
