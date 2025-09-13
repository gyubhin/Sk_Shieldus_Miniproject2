/**
 *@description 유저 정보 조회 응답
 */

import type { GroupsItem } from "@/features/group/_types/base";
import type { PagingResponse } from "@/shared/types/api";

export type GetUserInfoResponse = {
  id: number;
  email: string;
  nickname: string;
  region: string;
  profileImageUrl: string | null;
  introduction: string;
  postCount: number;
  commentCount: number;
};

/**
 *@description 내가 가입한 그룹 조회 응답
 */
export type GetMyJoinedGroupResponse = PagingResponse<GroupsItem>;
