import { useMutation } from "@tanstack/react-query";
import type { PostCommentBody, PutCommentBody } from "../_types/body";
import { deleteCommentApi, postCommentApi, patchCommentApi } from "../_apis/comment.api";

/**
 *@description 댓글 등록 훅
 */
export function usePostCommentApi(groupId: number, postId: number) {
  return useMutation({
    mutationFn: (body: PostCommentBody) => postCommentApi(groupId, postId, body),
  });
}

/**
 *@description 댓글 수정 훅
 */
export function usePatchCommentApi(groupId: number, postId: number) {
  return useMutation({
    mutationFn: (data: { body: PutCommentBody; commentId: number }) =>
      patchCommentApi(groupId, postId, data.commentId, data.body),
  });
}

/**
 *@description 댓글 삭제 훅
 */
export function useDeleteCommentApi(groupId: number, postId: number) {
  return useMutation({
    mutationFn: (commentId: number) => deleteCommentApi(groupId, postId, commentId),
  });
}
