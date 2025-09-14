import type { PagingResponse } from "@/shared/types/api";
import type { CategoriesItem } from "./base";
import type { GroupsItem } from "@/features/group/_types/base";

export type GetCategoriesListResponse = CategoriesItem[];

// categories with gorups
export type GetCategoriesWithGroupsResponse = PagingResponse<GroupsItem>;
