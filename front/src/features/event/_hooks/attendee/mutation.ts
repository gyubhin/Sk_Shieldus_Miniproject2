import { useMutation } from "@tanstack/react-query";
import {
  deleteCancelEventAttendeeApi,
  patchAttendeeStatusApi,
  postEventAttendeeApi,
} from "../../_apis/attendee.api";
import type { PatchAttendeeStatusBody } from "../../_types/body";

/**
 *@description attendees 참석자 신청 훅
 */
export function usePostEventsApi(eventId: number) {
  return useMutation({
    mutationFn: () => postEventAttendeeApi(eventId),
  });
}

/**
 *@description attendees 참석자 신청 훅
 */
export function useDeleteCancelEventAttendeeApi(eventId: number) {
  return useMutation({
    mutationFn: () => deleteCancelEventAttendeeApi(eventId),
  });
}

/**
 *@description attendees 참석자 신청 훅
 */
export function usePatchAttendeeStatusApi(eventId: number, userId: number) {
  return useMutation({
    mutationFn: (body: PatchAttendeeStatusBody) => patchAttendeeStatusApi(eventId, userId, body),
  });
}
