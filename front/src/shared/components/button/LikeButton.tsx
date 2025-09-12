import { useState } from "react";
import { IconButton } from "../icon/IconButton";

type Props = {
  isLike?: boolean;
  onClick?: () => void;
  size?: number;
};

/**
 *@description 좋아요 버튼
 */
function LikeButton({ isLike, onClick, size }: Props) {
  const [like, setLike] = useState(isLike);
  return (
    <IconButton
      onClick={() => setLike(!like)}
      fill={like ? "#f36438" : "#7f838cff"}
      iconName={like ? "FillHeart" : "StrokeHeart"}
      size={size ?? 14}
    />
  );
}

export default LikeButton;
