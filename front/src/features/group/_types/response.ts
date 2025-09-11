import type { PagingResponse } from "@/shared/types/api";
import type { GetGroupsMemberItem, GroupsItem } from "./base";

/**
 *@description 그룹 목록 조회 응답
 */
export type GetGroupsListResponse = PagingResponse<GroupsItem>;

/**
 *@description 특정 그룹 조회 응답
 */
export type GetGroupsOneResponse = GroupsItem;

/**
 *@description 그룹 멤버 목록 조회
 */
export type GetGroupsMemberListResponse = GetGroupsMemberItem[];
