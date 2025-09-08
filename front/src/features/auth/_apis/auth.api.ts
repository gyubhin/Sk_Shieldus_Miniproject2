import { apiCall } from "@/libs/apiCall";
import type { LoginApiResponse } from "../_types/response";
import type { LoginApiBody } from "../_types/body";

/**
 *@description login api
 */
export const loginApi = (body: LoginApiBody) => {
  return apiCall<LoginApiResponse>({
    url: "/auth/login",
    method: "POST",
    data: body,
  });
};
