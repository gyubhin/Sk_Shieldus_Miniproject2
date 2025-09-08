import styles from "./MyCommentItem.module.scss";

type Props = {
  title: string;
  content: string;
  createdAt: string;
};

/**
 *@description 마이페이지내 댓글 항목 ui 컴포넌트
 */
export function MyCommentItem({ title, content, createdAt }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{createdAt}</span>
      </div>

      <p className={styles.content}>{content}</p>
    </div>
  );
}
