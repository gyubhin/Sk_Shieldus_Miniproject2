import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import {
  getGroupsListApi,
  getGroupsMembersApi,
  getGroupsOneApi,
  getMyJoinedGroupsApi,
} from "../_apis/group.api";
import type { GetGroupsListQuery } from "../_types/query";
import type { PagingQuery } from "@/shared/types/api";

/**
 *@description 모임 목록 조회 훅
 */
export function useGetGroupsListApi(query: GetGroupsListQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.group.getGroupsList, query],
    queryFn: () => getGroupsListApi(query),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description 특정 그룹 조회 훅
 */
export function useGetGroupsOneApi(groupId?: string) {
  return useQuery({
    queryKey: [reactQueryKeys.group.getGroupsList, groupId],
    queryFn: () => getGroupsOneApi(groupId),
    select: (data) => {
      return data.data;
    },
    enabled: !!groupId,
  });
}

/**
 *@description 내가 가입한 모든 모임 목록 조회
 */
export function useGetMyJoinedGroupsApi(params: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.group.getMyJoinedGroup, params],
    queryFn: () => getMyJoinedGroupsApi(params),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description 그룹 멤버 목록 조회
 */
export function useGetGroupMemberApi(groupId?: string) {
  return useQuery({
    queryKey: [reactQueryKeys.group.getGroupsMembers, groupId],
    queryFn: () => getGroupsMembersApi(groupId),
    enabled: !!groupId,
  });
}
