import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getPostDetailApi, getPostListApi } from "../_apis/post.api";
import type { GetPostListQuery } from "../_types/query";

/**
 *@description 게시글 목록 조회 훅
 */
export function useGetPostListApi(groupId: number, query: GetPostListQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.post.getPostList, query],
    queryFn: () => getPostListApi(groupId, query),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description 게시글 목록 조회 훅
 */
export function usePostDetailApi(groupId: number, postId?: number) {
  return useQuery({
    queryKey: [reactQueryKeys.post.getPostList, { groupId, postId }],
    queryFn: () => getPostDetailApi(groupId, postId),
    select: (data) => {
      return data.data;
    },
    enabled: !!postId,
  });
}
