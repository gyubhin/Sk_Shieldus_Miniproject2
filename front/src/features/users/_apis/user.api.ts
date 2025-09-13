import { apiCall } from "@/libs/apiCall";
import { type GetMyJoinedGroupResponse, type GetUserInfoResponse } from "../_types/response";
import type { MutationResponse, PagingQuery } from "@/shared/types/api";
import type { PatchUserBody } from "../_types/body";

/**
 *@description user 정보 조회 api
 */
export const getUserInfo = () => {
  return apiCall<GetUserInfoResponse>({
    url: "/users/me",
  });
};

/**
 *@description 회원 정보 수정 api
 */
export const patchUser = (body: PatchUserBody) => {
  return apiCall<MutationResponse>({
    url: `/users/me`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description 내가 가입한 그룹 목록 조회
 */
export const getMyJoinedGroup = (query: PagingQuery) => {
  return apiCall<GetMyJoinedGroupResponse>({
    url: "/users/me/groups",
    params: query,
  });
};
