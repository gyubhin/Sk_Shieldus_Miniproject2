import dayjs from "dayjs";
import type { MyCommentItem } from "../../_types/base";
import styles from "./MyCommentItem.module.scss";

type Props = {
  data: MyCommentItem;
};

/**
 *@description 마이페이지내 댓글 항목 ui 컴포넌트
 */
export function MyCommentItem({ data }: Props) {
  return (
    <button className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>{dayjs(data.createdAt).format("YYYY.MM.DD")}</span>
      </div>

      <p className={styles.content}>{data.content}</p>
    </button>
  );
}
