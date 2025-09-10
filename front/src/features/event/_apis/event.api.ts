import { apiCall } from "@/libs/apiCall";
import type { MutationResponse } from "@/shared/types/api";
import type { PatchAttendeeStatusBody, PatchEventBody, PostEventBody } from "../_types/body";
import type { GetEventListResponse } from "../_types/response";

/**
 *@description 일정 생성 api
 */
export const postEventsApi = (groupId: number, body: PostEventBody) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}/events`,
    data: body,
    method: "POST",
  });
};

/**
 *@description 일정 목록 조회 api
 */
export const getEventsListApi = (groupId: number) => {
  return apiCall<GetEventListResponse>({
    url: `/groups/${groupId}/events`,
  });
};

/**
 *@description 일정 상세 조회 api
 */
export const getEventsDetailApi = (eventId: number) => {
  return apiCall<GetEventListResponse>({
    url: `/events/${eventId}`,
  });
};

/**
 *@description 일정 부분 수정 api
 */
export const patchEventsApi = (eventId: number, body: PatchEventBody) => {
  return apiCall<MutationResponse>({
    url: `/events/${eventId}`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description 일정 삭제 api
 */
export const deleteEventEventsApi = (eventId: number) => {
  return apiCall<undefined>({
    url: `/events/${eventId}`,
    method: "DELETE",
  });
};

/**
 *@description 일정 참석자 목록 api
 */
export const getEventsAttendeesApi = (eventId: number) => {
  return apiCall<undefined>({
    url: `/events/${eventId}/attendees`,
  });
};

/**
 *@description 일정 참석자 목록 api
 */
export const postEventAttendeeApi = (eventId: number) => {
  return apiCall<undefined>({
    url: `/events/${eventId}/attendees`,
    method: "POST",
  });
};

/**
 *@description 참석 취소 api
 */
export const deleteCancelEventAttendeeApi = (eventId: number) => {
  return apiCall<undefined>({
    url: `/events/${eventId}/attendees/me`,
    method: "DELETE",
  });
};

/**
 *@description 참석 상태 변경 (관리자/주최자 권한) api
 */
export const patchAttendeeStatusApi = (
  eventId: number,
  userId: number,
  body: PatchAttendeeStatusBody,
) => {
  return apiCall<undefined>({
    url: `/events/${eventId}/attendees/${userId}`,
    method: "PATCH",
    data: body,
  });
};
