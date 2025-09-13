/**
 *@description 이벤트 항목
 */
export type EventItem = {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  maxAttendees: number; // 최대 참석자수
  attendeesCount: number; // 현재 참석자수
  imageUrl?: string | null;
  location: string;
  groupId: number;
  hostId: number;
};

/**
 *@description 이벤트 참석자
 */
export type EventAttendee = {
  userId: number;
  username: string;
  role: "MEMBER" | "OWNER";
  status: "APPROVED" | "WAITING";
};

/**
 *@description 이벤트 참석자 명단
 */

export type EventAttendeeList = {
  confirmed: EventAttendee[];

  waiting: EventAttendee[];
};
