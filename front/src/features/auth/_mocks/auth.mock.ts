import { mswUtils } from "@/libs/msw";
import { http, HttpResponse } from "msw";

export const authHandlers = [
  // 로그인 API
  http.post(mswUtils.getUrl("/auth/login"), async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        accessToken: "mock-ac-123",
      },
      { status: 200 },
    );
  }),

  // 회원가입 API
  http.post(mswUtils.getUrl("/auth/signup"), async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        accessToken: "mock-ac-123",
      },
      { status: 200 },
    );
  }),

  // 로그아웃 API
  http.post(mswUtils.getUrl("/auth/logout"), async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(undefined, { status: 204 });
  }),

  // 로그아웃 API
  http.post(mswUtils.getUrl("/auth/logout"), async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(undefined, { status: 204 });
  }),
];
