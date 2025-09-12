import { apiCall } from "@/libs/apiCall";
import type { PatchAttendeeStatusBody } from "../_types/body";
import type { GetEventsAttendeesResponse } from "../_types/response";
import type { MutationResponse } from "@/shared/types/api";

// /**
//  *@description events 일정 참석자 목록 api
// TODO 회의 후, 결정
//  */
// export const getEventAttendeeAllStatusApi = (eventId: number) => {
//   return apiCall<undefined>({
//     url: `/events/${eventId}/attendees`,
//     method: "GET",
//   });
// };

/**
 *@description attendees 참석자 목록 조회 api (참석자 + 대기자)
 */
export const getEventAttendeeApi = (eventId?: number) => {
  return apiCall<GetEventsAttendeesResponse>({
    url: `/events/${eventId}/attendees`,
  });
};

/**
 *@description attendees 참석자 신청 api
 */
export const postEventAttendeeApi = (eventId: number) => {
  return apiCall<MutationResponse>({
    url: `/events/${eventId}/attendees`,
    method: "POST",
  });
};

/**
 *@description attendees 참석자 취소 api
 */
export const deleteCancelEventAttendeeApi = (eventId: number) => {
  return apiCall<MutationResponse>({
    url: `/events/${eventId}/attendees/me`,
    method: "DELETE",
  });
};

/**
 *@description attendees 참석자 상태 변경 (관리자/주최자 권한) api
 */
export const patchAttendeeStatusApi = (eventId: number, body: PatchAttendeeStatusBody) => {
  return apiCall<MutationResponse>({
    url: `/events/${eventId}/attendees/${body.userId}`,
    method: "PATCH",
    data: { status: body.status },
  });
};
