export type PostGroupsForm = {
  name: string;
  description: string;
  region: string;
  maxMembers: number;
  imageUrl?: string | null;
  tags: string;
  categoryId: number;
};

/**
 *@description 모임 등록 api 바디
 */
export type PostGroupsBody = PostGroupsForm;

/**
 *@description 모임 수정 api 바디
 */
export type PatchGroupsBody = Partial<PostGroupsForm>;
