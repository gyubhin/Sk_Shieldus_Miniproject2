import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getEventAttendeeApi } from "../../_apis/attendee.api";
import type { EventAttendeeList } from "../../_types/base";

/**
 *@description events 일정 상세 조회 훅 (참석자 + 대기자)
 */
export function useGetEventAttendeeApi(eventId?: number) {
  return useQuery({
    queryKey: [reactQueryKeys.attendee.getEventAttendee, eventId],
    queryFn: () => getEventAttendeeApi(eventId),
    select: (data) => {
      const confirmed = data.data.filter((item) => item.status === "CONFIRMED");
      const waiting = data.data.filter((item) => item.status === "WAITING");

      const res = { confirmed, waiting } as EventAttendeeList;
      return res;
    },
    enabled: !!eventId,
  });
}
