import type { PagingQuery } from "@/shared/types/api";

export type CategoryWithGroupQuery = PagingQuery & {
  search?: string | null;
  region?: string | null;
};
