/**
 *@description 모임 생성 api 바디
 */
export type PostGroupsBody = {
  name: string;
  description: string;
  region: string;
  maxMembers: number;
  categoryId: number;
};
