import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import type { PagingQuery } from "@/shared/types/api";
import {
  getEventsAttendeesApi,
  getEventsDetailApi,
  getEventsListApi,
  getMyUpcomingEvents,
} from "../../_apis/event.api";

/**
 *@description 일정 목록 조회 훅
 */
export function useGetEventsListApi(groupId?: string, query?: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.event.getEventsList, query],
    queryFn: () => getEventsListApi(groupId, query),
    select: (data) => {
      return data.data;
    },
    enabled: !!groupId,
  });
}

/**
 *@description events 일정 상세 조회 훅
 */
export function useGetEventsDetailApi(eventId: number) {
  return useQuery({
    queryKey: [reactQueryKeys.event.getEventsList, eventId],
    queryFn: () => getEventsDetailApi(eventId),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description events 일정 참석자 목록 훅
 */
export function useGetEventsAttendeesApi(eventId: number) {
  return useQuery({
    queryKey: [reactQueryKeys.event.getEventsAttendees, eventId],
    queryFn: () => getEventsAttendeesApi(eventId),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description 내 모임 event(일정) 목록 조회
 */
export function useGetMyUpcomingEvents() {
  return useQuery({
    queryKey: [reactQueryKeys.event.getEventsAttendees],
    queryFn: () => getMyUpcomingEvents(),
    select: (data) => {
      return data.data;
    },
  });
}
