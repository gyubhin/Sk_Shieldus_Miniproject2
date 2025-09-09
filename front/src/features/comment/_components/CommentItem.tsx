import styles from "./CommentItem.module.scss";

type Props = {
  author: string;
  content: string;
  createdAt: string;
  onReply?: () => void;
  onDelete?: () => void;
};

/**
 *@description 댓글 항목
 *@param onReply 응답 이벤트
 *@param onDelete 삭제 이벤트
 */
export function CommentItem({ author, content, createdAt, onReply, onDelete }: Props) {
  return (
    <div className={styles.container}>
      {/* 프로필 아이콘 */}
      <div className={styles.avatar} />

      {/* 본문 */}
      <div className={styles.body}>
        <p className={styles.text}>
          <span className={styles.author}>{author}</span> {content}
        </p>

        <div className={styles.meta}>
          <span className={styles.date}>{createdAt}</span>

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
