import { apiCall } from "@/libs/apiCall";
import type { MutationResponse } from "@/shared/types/api";
import type { PostCommentBody, PutCommentBody } from "../_types/body";

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
export const putCommentApi = (
  groupId: number,
  postId: number,
  commentId: number,
  body: PutCommentBody,
) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}/comments/${commentId}`,
    data: body,
    method: "PUT",
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
