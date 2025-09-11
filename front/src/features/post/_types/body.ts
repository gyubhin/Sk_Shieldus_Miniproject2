/**
 *@description 게시글 생성 요청 폼 타입
 */
export type CreatePostForm = {
  title: string;
  content: string;
};

/**
 *@description 게시글 수정 요청 폼 타입
 */
export type PutPostForm = CreatePostForm;
