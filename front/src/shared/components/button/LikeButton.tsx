import { useState } from "react";
import { IconButton } from "../icon/IconButton";

type Props = {
  isLike?: boolean;
  size?: number;
};

/**
 *@description 좋아요 버튼
 */
function LikeButton({ isLike, size }: Props) {
  return (
    <IconButton
      fill={isLike ? "#f36438" : "#7f838cff"}
      iconName={isLike ? "FillHeart" : "StrokeHeart"}
      size={size ?? 14}
    />
  );
}

export default LikeButton;
