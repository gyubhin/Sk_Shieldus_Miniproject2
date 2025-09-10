import type { PostItem } from "./base";

/**
 *@description 게시글 목록 조회 응답
 */
export type GetPostListResponse = PostItem[];

/**
 *@description 게시글 상세 조회 응답
 */
export type GetPostDetailResponse = PostItem;
