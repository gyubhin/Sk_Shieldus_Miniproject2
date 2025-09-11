import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import type { PagingQuery } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../_apis/comment.api";

/**
 *@description 댓글 목록 조회 훅
 */
export function useGetCommentsApi(postId: number, query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.comment.getComments, query],
    queryFn: () => getCommentsApi(postId, query),
    select: (data) => {
      return data.data;
    },
  });
}
