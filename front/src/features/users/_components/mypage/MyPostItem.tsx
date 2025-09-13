import { getImageUrl } from "@/libs/image";
import type { MyPostItem as MyPostItemType } from "../../_types/base";
import styles from "./MyPostItem.module.scss";

type Props = {
  data: MyPostItemType;
};

/**
 *@description 마이페이지 > 내가 쓴 게시글
 */
function MyPostItem({ data }: Props) {
  return (
    <section className={styles.mypost_wrapper}>
      <div className={styles.left}>
        <img
          className={styles.post_img}
          alt={"내 게시글 이미지"}
          src={getImageUrl(data.imageUrl)}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.content_view}>
          <p className={styles.title}>{data?.title ?? ""}</p>
          <p className={styles.content}>{data?.content ?? ""}</p>
        </div>
      </div>
    </section>
  );
}

export default MyPostItem;
