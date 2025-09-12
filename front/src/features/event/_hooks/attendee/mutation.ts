import { useMutation } from "@tanstack/react-query";
import {
  deleteCancelEventAttendeeApi,
  patchAttendeeStatusApi,
  postEventAttendeeApi,
} from "../../_apis/attendee.api";
import type { PatchAttendeeStatusBody } from "../../_types/body";

/**
 *@description attendees 참가 신청 훅 (참석자)
 */
export function usePostEventsAttendeeApi() {
  return useMutation({
    mutationFn: (eventId: number) => postEventAttendeeApi(eventId),
  });
}

/**
 *@description attendees 참가 취소 훅 (참석자)
 */
export function useDeleteCancelEventAttendeeApi() {
  return useMutation({
    mutationFn: (eventId: number) => deleteCancelEventAttendeeApi(eventId),
  });
}

/**
 *@description attendees 참석자 관리 훅 (관리자)
 */
export function usePatchAttendeeStatusApi(eventId: number) {
  return useMutation({
    mutationFn: (props: PatchAttendeeStatusBody) => patchAttendeeStatusApi(eventId, props),
  });
}
