/**
 *@description 댓글 생성
 */
export type PostCommentBody = {
  content: string;
  parentId: number | null;
};

/**
 *@description 댓글 수정
 */
export type PutCommentBody = Omit<PostCommentBody, "parentId">;
