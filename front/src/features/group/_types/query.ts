import type { PagingQuery } from "@/shared/types/api";

/**
 *@description 모임 목록 조회 페이징 query
 */
export type GetGroupsListQuery = PagingQuery & {
  search?: string | null;
  region?: string | null;
  categoryId?: string | null;
};
