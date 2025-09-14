import { apiCall } from "@/libs/apiCall";
import type { MutationResponse, PagingQuery } from "@/shared/types/api";
import type { PostCommentBody, PutCommentBody } from "../_types/body";
import type { GetCommentsResponse } from "../_types/response";

/**
 *@description 댓글 생성 api
 */
export const postCommentApi = (groupId: number, postId: number, body: PostCommentBody) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}/posts/${postId}/comments`,
    data: body,
    method: "POST",
  });
};

/**
 *@description 댓글 수정 api
 */
export const patchCommentApi = (
  groupId: number,
  postId: number,
  commentId: number,
  body: PutCommentBody,
) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}/comments/${commentId}`,
    data: body,
    method: "PATCH",
  });
};

/**
 *@description 댓글 삭제 api
 */
export const deleteCommentApi = (groupId: number, postId: number, commentId: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}/comments/${commentId}`,
    method: "DELETE",
  });
};

/**
 *@description 댓글 목록 조회 api
 */
export const getCommentsApi = (groupId: number, postId: number) => {
  return apiCall<GetCommentsResponse>({
    url: `/groups/${groupId}/posts/${postId}/comments`,
  });
};
