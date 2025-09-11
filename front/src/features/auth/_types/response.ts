import type { MutationResponse } from "@/shared/types/api";

/**
 *@description login api 응답
 */
export type LoginApiResponse = {
  accessToken: string;
  tokenType: string;
};

/**
 *@description 회원가입 api 응답
 */
export type SignupApiResponse = LoginApiResponse;
