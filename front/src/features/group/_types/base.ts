/**
 *@description 그룹 목록 항목 타입
 *@example
  {
    "id": 10,
    "name": "헬스 동아리",
    "description": "매주 헬스장 모임",
    "region": "서울",
    "maxMembers": 30,
    "ownerId": 5,
    "ownerNickname": "헬린이",
    "categoryId": 2,
    "categoryName": "운동"
  }
 */
export type GroupsItem = {
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

/**
 *@description 모임 멤버 항목
 */
export type GetGroupsMemberItem = {
  userId: number;
  nickname: string;
  role: "ADMIN" | "MEMBER";
};
