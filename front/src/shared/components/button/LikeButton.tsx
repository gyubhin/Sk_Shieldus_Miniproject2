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
  return (
    <IconButton
      onClick={onClick}
      fill={isLike ? "#f36438" : "#C6C8CD"}
      iconName={isLike ? "FillHeart" : "StrokeHeart"}
      size={size ?? 14}
    />
  );
}

export default LikeButton;
