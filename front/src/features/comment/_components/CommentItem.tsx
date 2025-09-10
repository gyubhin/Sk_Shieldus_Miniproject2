import type { CommentItem } from "../_types/base";
import styles from "./CommentItem.module.scss";
import { getRelativeTime } from "@/libs/time";

type Props = {
  onReply?: () => void;
  onDelete?: () => void;
  data: CommentItem;
};

/**
 *@description 댓글 항목
 *@param onReply 응답 이벤트
 *@param onDelete 삭제 이벤트
 */
export function CommentItem({ data, onReply, onDelete }: Props) {
  return (
    <div className={styles.container}>
      {/* 프로필 아이콘 */}
      <div className={styles.avatar} />

      {/* 본문 */}
      <div className={styles.body}>
        <p className={styles.text}>
          <span className={styles.author}>{data?.authorNickname ?? ""}</span> {data?.content ?? ""}
        </p>

        <div className={styles.meta}>
          <span className={styles.date}>{getRelativeTime(data.createdAt)}</span>

          <button className={styles.action} onClick={onReply}>
            답글달기
          </button>

          <button className={styles.action} onClick={onDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
