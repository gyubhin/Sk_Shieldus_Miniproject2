import { apiCall } from "@/libs/apiCall";
import type { GetCategoriesListResponse } from "../_types/response";

/**
 *@description 카테고리 목록 조회 api
 */
export const getCategoriesApi = () => {
  return apiCall<GetCategoriesListResponse>({
    url: `/categories`,
  });
};
