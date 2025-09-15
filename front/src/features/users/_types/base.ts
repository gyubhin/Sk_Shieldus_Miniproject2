import type { GroupsItem } from "@/features/group/_types/base";

// 마이페이지 내부 탭 키
export type MypageTabKey = "wish" | "mypost" | "mycomment";

/**
 *@description 내 게시글 항목
 */
export type MyPostItem = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  authorNickname: string;
  authorId: number;
  groupId: number;
  authorProfileImageUrl?: string | null;
};

/**
 *@description 내 댓글 항목
 */
export type MyCommentItem = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  postTitle: string;
  groupId: number;
};

/**
 *@description 내가 찜한 그룹
 */
export type MyLikedGroupItem = GroupsItem;
