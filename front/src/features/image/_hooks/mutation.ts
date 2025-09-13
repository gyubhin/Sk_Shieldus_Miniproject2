import { useMutation } from "@tanstack/react-query";
import { postUploadImage } from "../_apis/image.api";

/**
 *@description 이미지 업로드 훅
 */
export const usePostUploadImage = () => {
  return useMutation({
    mutationFn: (image: FormData) => postUploadImage(image),
  });
};
