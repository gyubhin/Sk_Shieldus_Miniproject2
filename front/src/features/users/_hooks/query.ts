import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import {
  getMyComments,
  getMyJoinedGroup,
  getMyLikedGroups,
  getMyPosts,
  getUserInfo,
} from "../_apis/user.api";
import type { PagingQuery } from "@/shared/types/api";
import { useAccessTokenStore } from "@/features/auth";

/**
 *@description 내모임 목록 조회 훅
 */
export function useGetMyJoinedGroup(query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.user.getUserMeGroups, query],
    queryFn: () => getMyJoinedGroup(query),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description user 정보 조회 훅
 */
export function useGetUserInfo() {
  const { accessToken } = useAccessTokenStore();

  return useQuery({
    queryKey: [reactQueryKeys.user.getUserInfo],
    queryFn: () => getUserInfo(),
    select: (data) => {
      return data.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    enabled: !!accessToken,
  });
}

/**
 *@description 내모임 목록 조회 훅
 */
export function useGetMyPosts(query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.user.getUserPosts, query],
    queryFn: () => getMyPosts(query),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description 내 댓글 목록 조회 훅
 */
export function useGetMyComments(query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.user.getUserComments, query],
    queryFn: () => getMyComments(query),
    select: (data) => {
      return data.data;
    },
  });
}

/**
 *@description 내 찜한 그룹 목록 조회 훅
 */
export function useGetMyLikedGroups(query: PagingQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.user.getMyLikedGroups, query],
    queryFn: () => getMyLikedGroups(query),
    select: (data) => {
      return data.data;
    },
  });
}
