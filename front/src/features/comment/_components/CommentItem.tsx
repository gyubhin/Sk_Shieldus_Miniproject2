import { useUserId } from "@/features/users/_hooks/useUserId";
import type { CommentItem } from "../_types/base";
import styles from "./CommentItem.module.scss";
import { getRelativeTime } from "@/libs/time";
import { getImageUrl } from "@/libs/image";

type Props = {
  onReply?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  data: CommentItem;
};

/**
 *@description 댓글 항목
 *@param onReply 응답 이벤트
 *@param onDelete 삭제 이벤트
 */
export function CommentItem({ data, onReply, onDelete, onEdit }: Props) {
  const userId = useUserId();

  return (
    <div className={styles.container}>
      {/* 프로필 아이콘 */}
      {data.authorProfileImageUrl ? (
        <img
          className={styles.profile_image}
          alt={"member_image"}
          src={getImageUrl(data.authorProfileImageUrl)}
        />
      ) : (
        <div className={styles.no_profile_image} />
      )}

      {/* 본문 */}
      <div className={styles.body}>
        <p className={styles.text}>
          <span className={styles.author}>{data?.authorNickname ?? ""}</span>

          {data?.parentAuthorNickname && (
            <span className={styles.parent}>@{data?.parentAuthorNickname ?? ""}</span>
          )}
          {data?.content ?? ""}
        </p>

        <div className={styles.meta}>
          <span className={styles.date}>{getRelativeTime(data.createdAt)}</span>

          <button className={styles.action} onClick={onReply}>
            답글달기
          </button>

          {userId === data.authorId && (
            <button className={styles.action} onClick={onEdit}>
              수정
            </button>
          )}

          {userId === data.authorId && (
            <button className={styles.action} onClick={onDelete}>
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
