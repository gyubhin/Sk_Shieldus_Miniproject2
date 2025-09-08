/**
 *@description react query set up
 */

import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useAccessTokenStore } from "@/features/auth/_stores/accessToken.store";
import axios from "axios";

/**
 *@description refresh 토큰 만료 로직 처리 -> at 제거 및 로그인페이지로 이동
 */
function handleAuthError(error: Error) {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    useAccessTokenStore.getState().reset();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}

/**
 *@description 기본 쿼리 클라이언트
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleAuthError,
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onError: handleAuthError,
    },
  },
});
