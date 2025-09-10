import { apiCall } from "@/libs/apiCall";
import type { PostGroupsBody } from "../_types/body";
import type { MutationResponse } from "@/shared/types/api";
import type {
  GetGroupsListResponse,
  GetGroupsMemberListResponse,
  GetGroupsOneResponse,
} from "../_types/response";
import type { GetGroupsListQuery } from "../_types/query";

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
 *@description 모임 정보 목록 조회 api
 */
export const getGroupsList = (params: GetGroupsListQuery) => {
  return apiCall<GetGroupsListResponse>({
    url: "/groups?page=0&size=10&sort=createdAt,DESC",
    params,
  });
};

/**
 *@description 특정 그룹 조회 api
 */
export const getGroupsOne = (groupId: number) => {
  return apiCall<GetGroupsOneResponse>({
    url: `/groups/${groupId}`,
  });
};

/**
 *@description 그룹 가입 api
 */
export const postGroupsJoin = (groupId: number) => {
  return apiCall<GetGroupsOneResponse>({
    url: `/groups/${groupId}/join`,
    method: "POST",
  });
};

/**
 *@description 그룹 탈퇴 api
 */
export const deleteGroupsLeave = (groupId: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/leave`,
    method: "DELETE",
  });
};

/**
 *@description 그룹 멤버 목록 조회 api
 */
export const getGroupsMembers = (groupId: number) => {
  return apiCall<GetGroupsMemberListResponse>({
    url: `/groups/${groupId}/members`,
  });
};

/**
 *@description 그룹 멤버 강퇴 api
 */
export const deleteGroupsMember = (groupId: number, userId: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/members/${userId}`,
    method: "DELETE",
  });
};
