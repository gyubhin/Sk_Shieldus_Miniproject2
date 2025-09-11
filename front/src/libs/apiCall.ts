import { useAccessTokenStore } from "@/features/auth/_stores/accessToken.store";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";

export const apiCall = axios.create({
  baseURL: import.meta.env.VITE_APP_LIVE_API_URL,
  // baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

apiCall.interceptors.request.use(
  (config) => {
    const token = useAccessTokenStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-XSRF-TOKEN"] = getCookie("xsrftk");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;

// rt 재발급 요청동안, 이후 요청 대기 array
let pendingRequests: ((token: string) => void)[] = [];

apiCall.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // rf 토큰 재발급 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 1. 재요청 설정
      originalRequest._retry = true;

      // 2. 재발급 요청 동안, 들어오는 다른 요청 담기
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiCall(originalRequest));
          });
        });
      }

      // 3. 요청
      isRefreshing = true;
      try {
        const res = await axios.post(
          // `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          // {},
          "",
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;
        useAccessTokenStore.getState().setToken(newAccessToken);

        // 3-1. 대기 중이던 요청들 실행
        pendingRequests.forEach((cb) => cb(newAccessToken));
        pendingRequests = [];

        // 3-2. 기존에 rt 재발급 요청에 실행한 실패 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiCall(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 그 외 에러 응답
    return Promise.reject(error);
  },
);
