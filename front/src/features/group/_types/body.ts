/**
 *@description 모임 생성 api 바디
 */
export type PostGroupsForm = {
  name: string;
  description: string;
  region: string;
  maxMembers: number;
  imageUrl?: File | null;
  tags: string;
  categoryId: number;
};

export type PostGroupsBody = FormData;
