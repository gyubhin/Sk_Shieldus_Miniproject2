import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useInfiniteQuery, useQuery, type InfiniteData } from "@tanstack/react-query";
import { getPostDetailApi, getPostListApi, getPostListCursorApi } from "../_apis/post.api";
import type { GetPostListQuery } from "../_types/query";
import type { Cursor } from "@/shared/types/api";
import type { GetPostListResponse } from "../_types/response";
import type { PostItem } from "../_types/base";

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
    enabled: !!groupId,
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

/**
 *@description 게시글 목록 커서 조회 훅
 */
export const useGetPostsWithCursorApi = (size: number, groupId: number) => {
  return useInfiniteQuery<
    Cursor<PostItem[]>,
    Error,
    InfiniteData<Cursor<PostItem[]>>,
    [string, number],
    { cursorId: string | null; size: number; groupId: number }
  >({
    queryKey: [reactQueryKeys.post.getPostsCursor, groupId],
    queryFn: ({ pageParam }) => getPostListCursorApi(pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor
        ? {
            cursorId: lastPage.nextCursor,
            size,
            groupId,
          }
        : null;
    },

    initialPageParam: { cursorId: null, size, groupId },
    enabled: !!groupId,
  });
};
