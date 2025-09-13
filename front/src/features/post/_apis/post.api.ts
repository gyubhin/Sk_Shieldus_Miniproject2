import { apiCall } from "@/libs/apiCall";
import type { Cursor, MutationResponse } from "@/shared/types/api";
import type { GetPostListQuery } from "../_types/query";
import type { GetPostDetailResponse, GetPostListResponse } from "../_types/response";
import type { PostItem } from "../_types/base";
import type { CreatePostBody, PatchPostBody } from "../_types/body";

/**
 *@description 게시글 생성 api
 */
export const createPostsApi = (groupId: number, body: CreatePostBody) => {
  return apiCall<MutationResponse>({
    url: `/groups/${groupId}/posts`,
    data: body,
    method: "POST",
  });
};

/**
 *@description 게시글 목록 조회 api
 */
export const getPostListApi = (groupId: number, query: GetPostListQuery) => {
  return apiCall<GetPostListResponse>({
    url: `/groups/${groupId}/posts`,
    params: query,
  });
};

/**
 *@description 게시글 상세 조회 api
 */
export const getPostDetailApi = (groupId: number, postId?: number) => {
  return apiCall<GetPostDetailResponse>({
    url: `/groups/${groupId}/posts/${postId}`,
  });
};

/**
 *@description 게시글 수정 api
 */
export const patchPostApi = (groupId: number, postId: number, body: PatchPostBody) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}`,
    method: "PATCH",
    data: body,
  });
};

/**
 *@description 게시글 삭제 api
 */
export const deletePostApi = (groupId: number, postId: number) => {
  return apiCall<undefined>({
    url: `/groups/${groupId}/posts/${postId}`,
    method: "DELETE",
  });
};

/**
 *@description 게시글 목록 커서방식 조회 api
 */
export const getPostListCursorApi = async (params: {
  cursorId: string | null;
  size: number;
  groupId: number;
}): Promise<Cursor<PostItem[]>> => {
  const { cursorId, size, groupId } = params;
  const res = await apiCall<Cursor<PostItem[]>>(`/groups/${groupId}/posts/infinite`, {
    params: { cursor: cursorId, size },
  });
  return res.data;
};

/**
 *@description 이미지 업로드
 */
export const uploadPostImageApi = async (groupId: number, file: File, postId?: number) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiCall.post<string>(`/groups/${groupId}/posts/${postId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // 백엔드에서 반환하는 path (String)
};
