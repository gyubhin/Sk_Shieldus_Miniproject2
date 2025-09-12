import type { TimeResponse } from "@/shared/types/api";

/**
 *@description 그룹 목록 항목 타입
 */

export type GroupsItem = {
  id: number;
  name: string;
  description: string;
  region: string;
  maxMembers: number;
  currentMembers: number;
  ownerId: number;
  ownerNickname: string;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
  tags: string;
  liked: boolean;
  joined?: boolean;
} & TimeResponse;

/**
 *@description 모임 멤버 항목
 */
export type GetGroupsMemberItem = {
  userId: number;
  nickname: string;
  role: "ADMIN" | "MEMBER";
};

/**
 *@description 모임 등록 폼 에러 타입
 */
export type GroupRegisterFormError = {
  name?: string;
  description?: string;
  region?: string;
  maxMembers?: string;
  categoryId?: string;
};
