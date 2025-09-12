import { useMutation } from "@tanstack/react-query";
import { deleteEventEventsApi, patchEventsApi, postEventsApi } from "../../_apis/event.api";
import type { PatchEventBody, PostEventBody } from "../../_types/body";

/**
 *@description events 일정 생성  훅
 */
export function usePostEventsApi(groupId: number) {
  return useMutation({
    mutationFn: (body: PostEventBody) => postEventsApi(groupId, body),
  });
}

/**
 *@description events 일정 부분 수정  훅
 */
export function usePatchEventsApi(eventId: number) {
  return useMutation({
    mutationFn: (body: PatchEventBody) => patchEventsApi(eventId, body),
  });
}

/**
 *@description events 일정 삭제  훅
 */
export function useDeleteEventEventsApi() {
  return useMutation({
    mutationFn: (eventId: number) => deleteEventEventsApi(eventId),
  });
}
