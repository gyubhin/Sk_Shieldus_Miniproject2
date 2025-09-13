import type { PagingResponse } from "@/shared/types/api";
import type { EventAttendee, EventItem } from "./base";

/**
 *@description 일정 목록 조회 응답
 */
export type GetEventListResponse = PagingResponse<EventItem>;

/**
 *@description 일정 상세 조회 응답
 */
export type GetEventsDetail = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  maxAttendees: number;
  groupId: number;
  attendeesCount: number;
  createdAt: string;
  updatedAt: string;
};

/**
 *@description 일정 참석자/대기자 목록
 */
export type GetEventsAttendeesResponse = EventAttendee[];

/**
 *@description 일정 참석자/대기자 목록, CONFIRMED > 정원 미달 시, WAITING > 정원 초과 시
 */
export type postEventAttendeeResponse = {
  message: string;
  status: "CONFIRMED" | "WAITING";
};
