/**
 *@description 이벤트 항목
 */
export type EventItem = {
  id: number;
  title: string;
  eventDate: string;
  maxAttendees: number; // 최대 참석자수
};

export type EventAttendee = {
  userId: number;
  nickname: string;
  role: "MEMBER" | "ADMIN";
};
