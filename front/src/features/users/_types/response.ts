/**
 *@description 유저 정보 조회 응답
 */

export type GetUserInfoResponse = {
  id: number;
  email: string;
  nickname: string;
  region: string;
  profileImageUrl: string | null;
  introduction: string;
};

/**
 *@description 내가 가입한 그룹 조회 응답
 */
export type GetMyJoinedGroup = {
  id: number;
  name: string;
  description: string;
  region: string;
  maxMembers: number;
  ownerId: number;
  ownerNickname: string;
  categoryId: number;
  categoryName: string;
};
