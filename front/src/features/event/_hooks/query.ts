import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import type { PagingQuery } from "@/shared/types/api";
import { getEventsListApi } from "../_apis/event.api";

/**
 *@description 일정 목록 조회 훅
 */
export function useGetEventsListApi(groupId: number, query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.event.getEventsList, query],
    queryFn: () => getEventsListApi(groupId, query),
    select: (data) => {
      return data.data;
    },
  });
}
