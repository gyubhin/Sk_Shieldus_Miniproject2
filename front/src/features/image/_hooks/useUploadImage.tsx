import { usePostUploadImage } from "./mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import { isAxiosError } from "axios";
import React from "react";

type UseUploadImageOptions = {
  onSuccess?: (imageUrl: string) => void;
};

/**
 *@description 공통 이미지 업로드 훅
 */
export function useUploadImage({ onSuccess }: UseUploadImageOptions = {}) {
  const { mutateAsync: mutateUploadImage } = usePostUploadImage();
  const { showToast } = useUiStore();

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      showToast({ message: "잘못된 접근입니다.", type: "error" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", "misc");

      const response = await mutateUploadImage(formData);

      onSuccess?.(response.data.imageUrl);

      showToast({ message: "이미지 업로드 성공!", type: "success" });
    } catch (error) {
      if (isAxiosError(error)) {
        showToast({ message: error.message ?? "이미지 업로드 실패", type: "error" });
      }
    }
  };

  return { onUploadImage, showToast };
}
