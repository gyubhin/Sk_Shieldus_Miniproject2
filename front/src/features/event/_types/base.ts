/**
 *@description 이벤트 항목
 */
export type EventItem = {
  id: number;
  title: string;
  eventDate: string;
  maxAttendees: number; // 최대 참석자수
  attendeesCount: number; // 현재 참석자수
  imageUrl?: string | null;
  location: string;
};

/**
 *@description 이벤트 참석자
 */
export type EventAttendee = {
  userId: number;
  nickname: string;
  role: "MEMBER" | "ADMIN";
};
