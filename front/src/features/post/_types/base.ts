import type { CommentItem } from "@/features/comment/_types/base";

/**
 *@description 게시글 목록 항목
 */
export type PostItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorNickname: string;
  authorId: number;
  imageUrl?: string | null;
  authorProfileImageUrl?: string | null;
};

/**
 *@description 게시글 상세
 */
export type PostDetailItem = PostItem & {
  comments: CommentItem[];
};

/**
 *@description 게시글 등록 폼 에러 타입
 */
export type PostRegisterFormError = {
  title?: string;
  content?: string;
};
