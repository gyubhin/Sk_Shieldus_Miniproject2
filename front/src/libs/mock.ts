import { HttpResponse } from "msw";
import type { ZodSafeParseResult } from "zod";

/**
 *@description mutation mock api 성공 응답
 */
export const mutationSuccessResponse = (status = 200) => {
  return HttpResponse.json({ success: true }, { status });
};

/**
 *@description not found mock error 응답
 */
export const notFoundErrorResponse = (message: string) => {
  return HttpResponse.json({
    code: "NOT_FOUND",
    message,
  });
};

/**
 *@description valid mock error 응답
 */
export const validationErrorResponse = <T>(
  parsed: ZodSafeParseResult<T>,
  messageFunc: (key: string) => string
) => {
  if (parsed.error && parsed.error?.issues.length !== 0) {
    const { message, path } = parsed.error.issues[0];

    // 검증 키로 에러 문구 반환
    if (path.length !== 0 && typeof path[0] === "string") {
      const _key = path[0] as string;

      return HttpResponse.json(
        {
          code: "BAD_REQUEST",
          message: messageFunc(_key),
          field: _key,
        },
        { status: 400 }
      );
    } else {
      return HttpResponse.json(
        {
          code: "SERVER_ERROR",
          message,
        },
        { status: 500 }
      );
    }
  }
};
