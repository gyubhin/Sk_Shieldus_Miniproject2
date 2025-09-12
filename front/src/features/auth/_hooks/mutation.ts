import { useMutation } from "@tanstack/react-query";
import { postLogoutApi } from "../_apis/auth.api";

/**
 *@description 로그아웃 요청 훅
 */
export function usePostLogoutApi() {
  return useMutation({
    mutationFn: () => postLogoutApi(),
  });
}
