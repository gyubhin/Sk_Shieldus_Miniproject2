import { http, HttpResponse } from "msw";

export const authHandlers = [
  // 로그인 API
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();
    console.log(body);

    // 성공 응답 (JWT 흉내)
    return HttpResponse.json(
      {
        accessToken: "mock-ac-123",
        refreshToken: "mock-rf-456",
      },
      { status: 200 }
    );
  }),
];
