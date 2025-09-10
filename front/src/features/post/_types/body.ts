/**
 *@description 게시글 생성 요청 바디
 */
export type CreatePostBody = {
  title: string;
  content: string;
};

/**
 *@description 게시글 수정 요청 바디
 */
export type PutPostBody = CreatePostBody;
