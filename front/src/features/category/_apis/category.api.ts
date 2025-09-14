import { apiCall } from "@/libs/apiCall";
import type {
  GetCategoriesListResponse,
  GetCategoriesWithGroupsResponse,
} from "../_types/response";
import type { PagingQuery } from "@/shared/types/api";
import type { CategoryWithGroupQuery } from "../_types/query";

/**
 *@description 카테고리 목록 조회 api
 */
export const getCategoriesApi = () => {
  return apiCall<GetCategoriesListResponse>({
    url: `/categories`,
  });
};

/**
 *@description 각 카테고려별 그룹 목록 조회 api
 */
export const getCategoriesWithGroupsApi = (query: CategoryWithGroupQuery) => {
  return apiCall<GetCategoriesWithGroupsResponse>({
    url: `/categories/with-groups`,
    params: query,
  });
};
