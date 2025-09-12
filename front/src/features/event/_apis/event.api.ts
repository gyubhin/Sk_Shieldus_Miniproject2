import { apiCall } from "@/libs/apiCall";
import type { MutationResponse, PagingQuery } from "@/shared/types/api";
import type { PatchEventBody, PostEventBody } from "../_types/body";
import type { GetEventListResponse, GetEventsDetail } from "../_types/response";

/**
 *@description events 일정 목록 조회 api
 */
export const getEventsListApi = (groupId: number, query: PagingQuery) => {
  return apiCall<GetEventListResponse>({
    url: `/groups/${groupId}/events`,
    params: query,
  });
};

/**
 *@description events 일정 상세 조회 api
 */
export const getEventsDetailApi = (eventId: number) => {
  return apiCall<GetEventsDetail>({
    url: `/events/${eventId}`,
  });
};

/**
 *@description events 일정 참석자 목록 api
 */
export const getEventsAttendeesApi = (eventId: number) => {
  return apiCall<undefined>({
    url: `/events/${eventId}/attendees`,
  });
};

/**
 *@description events 일정 생성 api
 */
export const postEventsApi = (groupId: number, body: PostEventBody) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}/events`,
    data: body,
    method: "POST",
  });
};

/**
 *@description events 일정 부분 수정 api
 */
export const patchEventsApi = (eventId: number, body: PatchEventBody) => {
  return apiCall<MutationResponse>({
    url: `/events/${eventId}`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description events 일정 삭제 api
 */
export const deleteEventEventsApi = (eventId: number) => {
  return apiCall<undefined>({
    url: `/events/${eventId}`,
    method: "DELETE",
  });
};
