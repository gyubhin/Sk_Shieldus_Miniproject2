import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getNotices } from "../_apis/notice.api";

/**
 *@description 공지사항 목록 훅
 */
export function useGetNotices() {
  return useQuery({
    queryKey: [reactQueryKeys.notice.getNotices],
    queryFn: () => getNotices(),
    select: (data) => {
      return data.data;
    },
  });
}
