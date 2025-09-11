import { apiCall } from "@/libs/apiCall";
import type { MutationResponse } from "@/shared/types/api";
import type { CreatePostBody, PutPostBody } from "../_types/body";
import type { GetPostListQuery } from "../_types/query";
import type { GetPostDetailResponse, GetPostListResponse } from "../_types/response";

/**
 *@description 게시글 생성 api
 */
export const createPostsApi = (groupId: number, body: CreatePostBody) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}/posts`,
    data: body,
    method: "POST",
  });
};

/**
 *@description 게시글 목록 조회 api
 */
export const getPostListApi = (groupId: number, query: GetPostListQuery) => {
  return apiCall<GetPostListResponse>({
    url: `/groups/${groupId}/posts`,
    params: query,
  });
};

/**
 *@description 게시글 상세 조회 api
 */
export const getPostDetailApi = (groupId: number, postId?: number) => {
  return apiCall<GetPostDetailResponse>({
    url: `/groups/${groupId}/posts/${postId}`,
  });
};

/**
 *@description 게시글 수정 api
 */
export const putPostApi = (groupId: number, postId: number, body: PutPostBody) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}`,
    method: "PUT",
    data: body,
  });
};

/**
 *@description 게시글 삭제 api
 */
export const deletePostApi = (groupId: number, postId: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}`,
    method: "DELETE",
  });
};
