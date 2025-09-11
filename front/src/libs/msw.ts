import type { DefaultBodyType, StrictRequest } from "msw";

export const mswUtils = {
  // query 파라미터 반환 유틸 메서드
  getParams: (request: StrictRequest<DefaultBodyType>, key: string) => {
    const url = new URL(request.url);

    return url.searchParams.get(key); // ?page=2 → "2"
  },

  getUrl: (url: string) => {
    return `${import.meta.env.VITE_APP_API_URL}${url}`;
  },
};
