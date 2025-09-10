import { apiCall } from "@/libs/apiCall";
import type { LoginApiBody, SignupApiBody } from "../_types/body";
import type { MutationResponse } from "@/shared/types/api";

/**
 *@description login api
 */
export const postLoginApi = (body: LoginApiBody) => {
  return apiCall<MutationResponse>({
    url: "/auth/login",
    method: "POST",
    data: body,
  });
};

/**
 *@description signup api
 */
export const postSignupApi = (body: SignupApiBody) => {
  return apiCall<MutationResponse>({
    url: "/auth/signup",
    method: "POST",
    data: body,
  });
};

/**
 *@description logout api -> suc status : 204
 */
export const postLogoutApi = () => {
  return apiCall<undefined>({
    url: "/auth/logout",
    method: "POST",
  });
};

/**
 *@description 토큰 재발급
 */
export const postRefresh = () => {
  return apiCall<MutationResponse>({
    url: "/refresh",
    method: "POST",
  });
};
