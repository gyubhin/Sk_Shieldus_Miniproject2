import type { PagingResponse } from "@/shared/types/api";
import type { PostDetailItem, PostItem } from "./base";

/**
 *@description 게시글 목록 조회 응답
 */
export type GetPostListResponse = PagingResponse<PostItem>;

/**
 *@description 게시글 상세 조회 응답
 */
export type GetPostDetailResponse = PostDetailItem;
