import { http, HttpResponse } from "msw";
import type { CategoriesItem } from "../_types/base";
import { mswUtils } from "@/libs/msw";

let data = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: `카테고리${i}`,
})) as CategoriesItem[];

export const categoriesHandlers = [
  // 카테고리 조회 api
  http.get(mswUtils.getUrl("/categories"), () => {
    return HttpResponse.json(data, { status: 200 });
  }),
];
