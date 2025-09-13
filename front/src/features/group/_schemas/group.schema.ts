import { z } from "zod";

export const groupSchema = z.object({
  name: z
    .string()
    .min(2, "모임 이름은 2자 이상 입력해주세요.")
    .max(100, "모임 이름은 100자 이하로 입력해주세요."),
  description: z.string().min(2, "모임 설명은 2자 이상 입력해주세요."),
  categoryId: z.number().min(1, "카테고리를 선택해주세요."),
  region: z.string().min(1, "지역을 선택해주세요."),
  maxMembers: z.number("최대 인원은 숫자여야 합니다.").min(2, "최대 인원은 2명 이상이어야 합니다."),
  tags: z.string(),
  // tags: z.array(z.string()).max(5, "태그는 최대 5개까지 등록할 수 있습니다."),
  imageUrl: z.string().nullable().optional(),
});

// 등록/수정용 타입
export type GroupForm = z.infer<typeof groupSchema>;
