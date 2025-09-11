import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getMyJoinedGroup } from "../_apis/user.api";
import type { PagingQuery } from "@/shared/types/api";

/**
 *@description 내모임 목록 조회 훅
 */
export function useGetMyJoinedGroup(query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.user.getUserMeGroups, query],
    queryFn: () => getMyJoinedGroup(query),
    select: (data) => {
      return data.data;
    },
  });
}
