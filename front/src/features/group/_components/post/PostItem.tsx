import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./PostItem.module.scss";
import type { PostItem as PostItemType } from "@/features/post/_types/base";
import { getRelativeTime } from "@/libs/time";

type Props = {
  onContentOpen: () => void;
  data: PostItemType;
  onMoreOpen: (postId: number) => void;
  userId?: number | null;
};
/**
 *@description 모임 게시글 항목
 */
function PostItem({ onContentOpen, data, onMoreOpen, userId }: Props) {
  return (
    <section className={styles.post_wrapper}>
      {/* 상단 뷰 */}
      <section className={styles.top_view}>
        <div className={styles.profile_image} />

        <p>{data.authorNickname}</p>

        <p>{getRelativeTime(data.createdAt)}</p>

        {userId === data.authorId && (
          <button className={styles.more_btn} onClick={() => onMoreOpen(data.id)}>
            <IconButton iconName={"More"} />
          </button>
        )}
      </section>

      {/* 게시글 이미지 */}
      <section className={styles.img_view}>
        <button onClick={onContentOpen}>
          <img src={"/images/ImagePostDummy.svg"} alt="ImagePostDummy" />
        </button>
      </section>

      {/* 헬퍼 뷰 */}
      <section className={styles.helper_view}>
        {/* 댓글 버튼 */}
        <IconButton iconName={"Bubble"} onClick={onContentOpen} />

        {/* 공유하기 버튼 */}
        <IconButton iconName={"Share"} />
      </section>

      {/* 내용 */}
      <section className={styles.content_view}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.content}>{data.content}</p>
      </section>
    </section>
  );
}

export default PostItem;
