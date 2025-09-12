import { useMutation } from "@tanstack/react-query";
import { createPostsApi, deletePostApi, putPostApi } from "../_apis/post.api";

/**
 *@description 게시글 등록 훅
 */
export function useCreatePostsApi(groupId: number) {
  return useMutation({
    mutationFn: (body: FormData) => createPostsApi(groupId, body),
  });
}

/**
 *@description 게시글 수정 훅
 */
export function usePutPostApi(groupId: number, postId: number) {
  return useMutation({
    mutationFn: (body: FormData) => putPostApi(groupId, postId, body),
  });
}

/**
 *@description 게시글 삭제 훅
 */
export function useDeletePostApi(groupId: number) {
  return useMutation({
    mutationFn: (postId: number) => deletePostApi(groupId, postId),
  });
}
