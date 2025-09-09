import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./PostItem.module.scss";
import { useState } from "react";
import clsx from "clsx";

type Props = {};

/**
 *@description 모임 게시글 항목
 */
function PostItem() {
  const [isExpandContent, setExpandContent] = useState(false);

  return (
    <section className={styles.post_wrapper}>
      {/* 상단 뷰 */}
      <section className={styles.top_view}>
        <div className={styles.profile_image} />

        <p>노랭이</p>

        <p>1일</p>
      </section>

      {/* 게시글 이미지 */}
      <section className={styles.img_view}>
        <img src={"/images/ImagePostDummy.svg"} alt="ImagePostDummy" />
      </section>

      {/* 헬퍼 뷰 */}
      <section className={styles.helper_view}>
        {/* 댓글 버튼 */}
        <IconButton iconName={"Bubble"} />

        {/* 공유하기 버튼 */}
        <IconButton iconName={"Share"} />
      </section>

      {/* 내용 */}
      <section className={styles.content_view}>
        <p className={clsx(!isExpandContent && styles.hide_text)}>
          신작 소식지 전해드립니다.신작 소식지 전해드립니다.신작 소식지 전해드립니다.신작 소식지
          전해드립니다. 신작 소식지 전해드립니다.신작 소식지 전해드립니다.신작 소식지
          전해드립니다.신작 소식지 전해드립니다.
        </p>

        <button onClick={() => setExpandContent(!isExpandContent)}>더보기</button>
      </section>
    </section>
  );
}

export default PostItem;
