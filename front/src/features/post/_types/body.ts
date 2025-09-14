/**
 *@description 게시글 생성 요청 폼 타입
 */
export type CreatePostBody = {
  title: string;
  content: string;
  imageUrl?: string | null;
};

/**
 *@description 게시글 수정 요청 폼 타입
 */
export type PatchPostBody = CreatePostBody;
