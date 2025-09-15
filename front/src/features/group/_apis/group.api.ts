import { apiCall } from "@/libs/apiCall";
import type { PatchGroupsBody, PostGroupsBody } from "../_types/body";
import type { MutationResponse, PagingQuery } from "@/shared/types/api";
import type {
  GetGroupsListResponse,
  GetGroupsMemberListResponse,
  GetGroupsOneResponse,
} from "../_types/response";
import type { GetGroupsListQuery } from "../_types/query";
import type { GroupsItem } from "../_types/base";

/**
 *@description 모임 생성 api
 */
export const postGroupsApi = (body: PostGroupsBody) => {
  return apiCall<MutationResponse>({
    url: "/groups",
    method: "POST",
    data: body,
  });
};

/**
 *@description 모임 수정 api
 */
export const patchGroupsApi = (body: PatchGroupsBody, groupId?: string) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description 모임 정보 목록 조회 api
 *@query ?page=0&size=10&sort=createdAt,DESC
 */
export const getGroupsListApi = (params: GetGroupsListQuery) => {
  return apiCall<GetGroupsListResponse>({
    url: "/groups/search",
    params,
  });
};

/**
 *@description 내가 가입한 모든 모임 목록 조회 api
 */
export const getMyJoinedGroupsApi = (params: PagingQuery) => {
  return apiCall<GroupsItem[]>({
    url: "/groups/my",
    params,
  });
};

/**
 *@description 특정 그룹 조회 api
 */
export const getGroupsOneApi = (groupId?: string) => {
  return apiCall<GetGroupsOneResponse>({
    url: `/groups/${groupId}`,
  });
};

/**
 *@description 그룹 가입 api
 */
export const postGroupsJoinApi = (groupId: number) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}/join`,
    method: "POST",
  });
};

/**
 *@description 그룹 탈퇴 api
 */
export const deleteGroupsLeaveApi = (groupId: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/leave`,
    method: "DELETE",
  });
};

/**
 *@description 그룹 멤버 목록 조회 api
 */
export const getGroupsMembersApi = (groupId?: string) => {
  return apiCall<GetGroupsMemberListResponse>({
    url: `/groups/${groupId}/members`,
  });
};

/**
 *@description 그룹 멤버 강퇴 api
 */
export const deleteGroupsMemberApi = (groupId?: string, userId?: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/members/${userId}`,
    method: "DELETE",
  });
};

/**
 *@description 모임장이 그룹 삭제 api
 */
export const deleteGroupsApi = (groupId?: string) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}`,
    method: "DELETE",
  });
};

/**
 *@description 모임장 위임 api
 */
export const patchDelegateOwner = (targretId: number, groupId?: string) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/delegate-owner/${targretId}`,
    method: "PATCH",
  });
};

/**
 *@description 모임장이 찜 or 취소 api
 */
export const postGroupsLike = (groupId: number) => {
  return apiCall<{ liked: boolean }>({
    url: `/groups/${groupId}/like`,
    method: "POST",
  });
};
