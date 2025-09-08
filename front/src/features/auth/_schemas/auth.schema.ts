import { z } from "zod";
import { authConstant } from "../_constants/auth.constant";

/**
 *@description auth 스키마 스크립트
 */

const _baseSchema = z.object({
  email: z.email(authConstant.error.validation.wrongFormatEmail),
  password: z
    .string()
    .min(8, authConstant.error.validation.worngFormatPassword.min)
    .max(20, authConstant.error.validation.worngFormatPassword.max),
  passwordConfirm: z
    .string()
    .min(8, authConstant.error.validation.worngFormatPassword.min)
    .max(20, authConstant.error.validation.worngFormatPassword.max),
});

// 로그인 스키마
export const loginSchema = _baseSchema.pick({ email: true, password: true });

export type LoginFormSchema = z.infer<typeof loginSchema>;
