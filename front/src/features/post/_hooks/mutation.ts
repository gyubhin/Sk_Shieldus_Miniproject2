import { useMutation } from "@tanstack/react-query";
import { createPostsApi, deletePostApi, patchPostApi, uploadPostImageApi } from "../_apis/post.api";
import type { CreatePostBody, PatchPostBody } from "../_types/body";

/**
 *@description 게시글 등록 훅
 */
export function useCreatePostsApi(groupId: number) {
  return useMutation({
    mutationFn: (body: CreatePostBody) => createPostsApi(groupId, body),
  });
}

/**
 *@description 게시글 수정 훅
 */
export function usePatchPostApi(groupId: number, postId: number) {
  return useMutation({
    mutationFn: (body: PatchPostBody) => patchPostApi(groupId, postId, body),
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

/**
 *@description 이미지 업로드 훅
 */
export const useUploadPostImage = (groupId: number, postId?: number) => {
  return useMutation({
    mutationFn: (file: File) => uploadPostImageApi(groupId, file, postId),
  });
};
