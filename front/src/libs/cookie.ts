/**
 *@description 쿠키 관리 util 스크립트
 */

const isProd = process.env.NODE_ENV === "production";

/**
 *@description 쿠키 설정
 */
export function setCookie(name: string, value: string, maxAgeSec: number) {
  // 서버 사이드 랜더링 타입에러 체크
  if (typeof document === "undefined") return;

  const attrs = [
    "path=/",
    `max-age=${maxAgeSec}`,
    "samesite=lax",
    isProd ? "secure" : "",
  ].filter((item) => item.length > 0);

  document.cookie = `${name}=${encodeURIComponent(value)}; ${attrs.join("; ")}`;
}

/**
 *@description 쿠키 삭제
 */
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

/**
 *@description 쿠키 값 조회
 */
export function getCookie(name: string) {
  if (typeof document === "undefined") return;

  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
