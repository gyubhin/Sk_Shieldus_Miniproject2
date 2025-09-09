import { CommentItem } from "@/features/comment/_components/CommentItem";
import styles from "./PostContentModal.module.scss";
import { IconButton } from "@/shared/components/icon/IconButton";

type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

type Props = {
  isOpen?: boolean;
  imageUrl: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
  onClose: () => void;
  onAddComment?: (text: string) => void;
};

export function PostContentModal({
  isOpen,
  imageUrl,
  author,
  content,
  createdAt,
  comments,
  onClose,
  onAddComment,
  title,
}: Props) {
  if (!isOpen) return;

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

              <span className={styles.author}>{author}</span>
              <span>{createdAt}</span>
            </div>

            <IconButton size={24} onClick={onClose} iconName={"Close"} />
          </div>

          <div className={styles.main_wrapper}>
            {/* 본문 */}
            <div className={styles.content_wrapper}>
              <p className={styles.text}>
                <span className={styles.title}>{title}</span>
              </p>

              <p className={styles.text}>
                <span className={styles.content}>{content}</span>
              </p>
            </div>

            {/* 댓글 리스트 */}
            <div className={styles.comments_wrapper}>
              {comments.map((c) => (
                <CommentItem
                  key={c.id}
                  author={c.author}
                  content={c.content}
                  createdAt={c.createdAt}
                />
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
