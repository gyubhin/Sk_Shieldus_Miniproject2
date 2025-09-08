/**
 *@description 시간 처리 유틸 함수 모음
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 사용

// 플러그인 등록
dayjs.extend(relativeTime);
dayjs.locale("ko");

/**
 *@description 상대 시간 반환 유틸함수
 * @param date ISO 문자열, Date 객체, 또는 dayjs가 파싱 가능한 값
 * @returns string (예: "30초 전", "10분 전", "2시간 전", "3일 전")
 */
export const getRelativeTime = (date?: string | Date) => {
  const now = dayjs();
  const target = dayjs(date);

  if (!target.isValid()) {
    return "";
  }

  const diffInSeconds = now.diff(target, "second");

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};
