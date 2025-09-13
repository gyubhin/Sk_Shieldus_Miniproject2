import { apiCall } from "@/libs/apiCall";
import type { ImageUploadResponse } from "@/shared/types/api";

/**
 *@description 이미지 업로드 api
 */
export const postUploadImage = (image: FormData) => {
  return apiCall<ImageUploadResponse>({
    url: `/images`,
    method: "POST",
    data: image,
  });
};
