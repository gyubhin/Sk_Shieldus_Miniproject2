import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(2, "제목은 2자 이상 입력해주세요.")
    .max(100, "제목은 100자 이하로 입력해주세요."),
  description: z.string().min(2, "내용은 2자 이상 입력해주세요."),
  imageUrl: z.string().optional(), // 업로드 안 할 수도 있으니 optional
  location: z.string().min(1, "장소를 입력해주세요."),
  eventDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "올바른 날짜 형식을 입력해주세요.",
  }),
  maxAttendees: z
    .number()
    .min(1, "최소 1명 이상이어야 합니다.")
    .max(200, "최대 200명 이하이어야 합니다."),
});

// 등록/수정용 타입
export type EventSchema = z.infer<typeof eventSchema>;
