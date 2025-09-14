import { apiCall } from "@/libs/apiCall";
import type { NoticeList } from "../_types/response";

/**
 *@description 공지사항 목록 조회
 */
export const getNotices = () => {
  return apiCall<NoticeList>({
    url: `/notices`,
  });
};
