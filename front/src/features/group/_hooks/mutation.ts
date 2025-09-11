import { useMutation } from "@tanstack/react-query";
import { postGroupsApi } from "../_apis/group.api";
import type { PostGroupsBody } from "../_types/body";

/**
 *@description 모임 생성 요청 훅
 */
export const usePostGroupsApi = () => {
  return useMutation({
    mutationFn: (body: PostGroupsBody) => postGroupsApi(body),
  });
};
