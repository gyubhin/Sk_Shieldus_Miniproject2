import { getImageUrl } from "@/libs/image";
import type { MyPostItem as MyPostItemType } from "../../_types/base";
import styles from "./MyPostItem.module.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  data: MyPostItemType;
};

/**
 *@description 마이페이지 > 내가 쓴 게시글
 */
function MyPostItem({ data }: Props) {
  const navigate = useNavigate();

  const onMovePage = () => {
    if (!data.groupId) return;

    navigate(`/group/${data.groupId}/post`);
  };
  return (
    <section className={styles.mypost_wrapper} onClick={onMovePage}>
      <div className={styles.left}>
        {data.imageUrl ? (
          <img
            className={styles.post_img}
            alt={"내 게시글 이미지"}
            src={getImageUrl(data.imageUrl)}
          />
        ) : (
          <div className={styles.no_image}>
            <p>no image</p>
          </div>
        )}
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
