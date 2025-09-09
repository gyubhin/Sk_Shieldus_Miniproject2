import styles from "./MyPostItem.module.scss";

type Props = {
  title: string;
  content: string;
};

/**
 *@description 마이페이지 > 내가 쓴 게시글
 */
function MyPostItem({ title, content }: Props) {
  return (
    <section className={styles.mypost_wrapper}>
      <div className={styles.left}>
        <img className={styles.post_img} />
      </div>

      <div className={styles.right}>
        <div className={styles.user_profile_view}>
          <div className={styles.profile_img} />

          <p>토토</p>
        </div>

        <div className={styles.content_view}>
          <p className={styles.title}>{title}</p>
          <p className={styles.content}>{content}</p>
        </div>

        <div className={styles.post_sub_info}>
          <p>댓글 12</p>

          <p>조회수 200</p>
        </div>
      </div>
    </section>
  );
}

export default MyPostItem;
