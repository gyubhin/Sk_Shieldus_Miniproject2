import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(2, "모임 이름은 2자 이상 입력해주세요.")
    .max(100, "모임 이름은 100자 이하로 입력해주세요."),
  content: z.string().min(2, "모임 설명은 2자 이상 입력해주세요."),
  image: z.string().optional(), // 파일 업로드는 나중에 처리
});

// 등록/수정용 타입
export type PostSchema = z.infer<typeof postSchema>;
