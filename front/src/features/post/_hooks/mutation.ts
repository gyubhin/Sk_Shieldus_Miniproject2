import { useMutation } from "@tanstack/react-query";
import type { CreatePostBody } from "../_types/body";
import { createPostsApi } from "../_apis/post.api";

/**
 *@description 게시글 등록 훅
 */
export function useCreatePostsApi(groupId: number) {
  return useMutation({
    mutationFn: (body: CreatePostBody) => createPostsApi(groupId, body),
  });
}
