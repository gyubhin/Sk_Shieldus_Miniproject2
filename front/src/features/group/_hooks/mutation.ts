import { useMutation } from "@tanstack/react-query";
import {
  deleteGroupsApi,
  deleteGroupsLeaveApi,
  deleteGroupsMemberApi,
  patchDelegateOwner,
  postGroupsApi,
  postGroupsJoinApi,
} from "../_apis/group.api";

/**
 *@description 모임 생성 요청 훅
 */
export const usePostGroupsApi = () => {
  return useMutation({
    mutationFn: (body: FormData) => postGroupsApi(body),
  });
};

/**
 *@description 그룹 가입 훅
 */

export const usePostGroupsJoinApi = () => {
  return useMutation({
    mutationFn: (groupId: number) => postGroupsJoinApi(groupId),
  });
};

/**
 *@description 그룹 탈퇴 훅
 */

export const useDeleteGroupsLeaveApi = () => {
  return useMutation({
    mutationFn: (groupId: number) => deleteGroupsLeaveApi(groupId),
  });
};

/**
 *@description 그룹 강퇴 훅
 */

export const useDeleteGroupsMemberApi = (groupId?: string) => {
  return useMutation({
    mutationFn: (userId: number) => deleteGroupsMemberApi(groupId, userId),
  });
};

/**
 *@description 그룹 삭제 훅
 */

export const useDeleteGroupsApi = (groupId?: string) => {
  return useMutation({
    mutationFn: () => deleteGroupsApi(groupId),
  });
};
/**
 *@description 모임 위임 훅
 */

export const usePatchDelegateOwner = (groupId?: string) => {
  return useMutation({
    mutationFn: (targetId: number) => patchDelegateOwner(targetId, groupId),
  });
};
