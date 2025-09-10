import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getGroupsListApi } from "../_apis/group.api";
import type { GetGroupsListQuery } from "../_types/query";

/**
 *@description 모임 목록 조회 훅
 */
export function useGetGroupsListApi(query: GetGroupsListQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.group.getGroupsList, query],
    queryFn: () => getGroupsListApi(query),
    select: (data) => {
      return data.data;
    },
  });
}
