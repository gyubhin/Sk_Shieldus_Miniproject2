/**
 *@description 댓글 항목
 */
export type CommentItem = {
  id: number;
  content: string;
  createdAt: string;
  authorNickname: string;
  authorId: number;
  parentId: number | null;
  parentAuthorNickname: string | null;
  authorProfileImageUrl?: string | null;
  children?: CommentItem[];
};
