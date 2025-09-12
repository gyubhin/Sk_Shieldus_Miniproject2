import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getEventAttendeeApi } from "../../_apis/attendee.api";

/**
 *@description events 일정 상세 조회 훅
 */
export function useGetEventAttendeeApi(eventId: number) {
  return useQuery({
    queryKey: [reactQueryKeys.attendee.getEventAttendee, eventId],
    queryFn: () => getEventAttendeeApi(eventId),
    select: (data) => {
      return data.data;
    },
  });
}
