import type { PagingResponse } from "@/shared/types/api";
import type { CommentItem } from "./base";

// 댓글 목록 조회 응답
export type GetCommentsResponse = PagingResponse<CommentItem>;
