import { CommentItem } from "@/features/comment/_components/CommentItem";
import styles from "./PostContentModal.module.scss";
import { IconButton } from "@/shared/components/icon/IconButton";
import { usePostDetailApi } from "@/features/post/_hooks/query";
import dayjs from "dayjs";

type Props = {
  groupId?: number;
  postId?: number;
  isOpen?: boolean;
  imageUrl: string;
  onClose: () => void;
};

/**
 *@description 게시글 상세 내용 + 댓글 모달
 */
export function PostContentModal({ groupId, postId, isOpen, imageUrl, onClose }: Props) {
  if (!isOpen || !groupId || !postId) return;

  const { data } = usePostDetailApi(groupId, postId);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 왼쪽: 게시글 이미지 */}
        <div className={styles.image_wrapper}>
          <img src={imageUrl} alt="post" className={styles.image} />
        </div>

        {/* 오른쪽: 본문 + 댓글 */}
        <div className={styles.right}>
          {/* 헤더 */}
          <div className={styles.header}>
            <div className={styles.author_view}>
              <div className={styles.profile_img} />

              <span className={styles.author}>{data?.authorNickname ?? ""}</span>
              <span>{dayjs(data?.createdAt).format("YYYY-MM-DD")}</span>
            </div>

            <IconButton size={24} onClick={onClose} iconName={"Close"} />
          </div>

          <div className={styles.main_wrapper}>
            {/* 본문 */}
            <div className={styles.content_wrapper}>
              <p className={styles.text}>
                <span className={styles.title}>{data?.title ?? ""}</span>
              </p>

              <p className={styles.text}>
                <span className={styles.content}>{data?.content ?? ""}</span>
              </p>
            </div>

            {/* 댓글 리스트 */}
            <div className={styles.comments_wrapper}>
              {data?.comments.map((c) => (
                <CommentItem key={c.id} data={c} />
              ))}
            </div>
          </div>

          {/* 댓글 입력 */}
          <div className={styles.comment_input}>
            <input type="text" placeholder="댓글을 입력하세요..." onKeyDown={(e) => {}} />

            <button onClick={() => {}}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}
