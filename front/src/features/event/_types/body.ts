/**
 *@description 이벤트 등록 요청 바디
 */
export type PostEventBody = {
  title: string;
  description: string;
  imageUrl?: string | null;
  location: string;
  eventDate: string;
  maxAttendees: number;
};

/**
 *@description 일정 수정 요청 바디
 */
export type PatchEventBody = PostEventBody;

/**
 *@description 참석 상태 변경 바디
 */
export type PatchAttendeeStatusBody = {
  status: "CANCELLED" | "GOING" | "WAITING";
  userId: number;
};
