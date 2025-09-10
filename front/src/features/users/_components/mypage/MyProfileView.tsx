import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./MyProfileView.module.scss";

type Props = {
  avatarUrl?: string;
  nickname: string;
  description?: string;
  postCount: number;
  commentCount: number;
  onEditProfile?: () => void;
  onEditLocation?: () => void;
  onSettings?: () => void;
};

/**
 *@description 마이페이지 > 상단 프로필 뷰
 */
export function MyProfileView({
  avatarUrl,
  nickname,
  description,
  postCount,
  commentCount,
  onEditProfile,
  onEditLocation,
  onSettings,
}: Props) {
  return (
    <section className={styles.container}>
      {/* 왼쪽: 아바타 + 버튼 */}
      <div className={styles.left}>
        <div className={styles.profile_img_wrapper}>
          <img
            src={avatarUrl || "/images/ImageProfileDefault.svg"}
            alt="프로필"
            className={avatarUrl ? styles.profile_image : styles.profile_default_image}
          />
        </div>

        <button className={styles.edit_btn} onClick={onEditProfile}>
          프로필 수정
        </button>
      </div>

      {/* 중앙: 닉네임, 소개, 카운트 */}
      <div className={styles.center}>
        <p className={styles.description}>{description}</p>
        <p className={styles.nickname}>{nickname}</p>

        <div className={styles.counts}>
          <div className={styles.count}>
            <span className={styles.number}>{postCount}</span>
            <span className={styles.label}>게시물</span>
          </div>

          <div className={styles.count}>
            <span className={styles.number}>{commentCount}</span>
            <span className={styles.label}>댓글</span>
          </div>
        </div>
      </div>

      {/* 오른쪽: 동네 수정, 설정 */}
      <div className={styles.right}>
        <button className={styles.icon_btn} onClick={onEditLocation}>
          <IconButton iconName={"Marker"} />

          <span className="icon_button_text">동네 수정</span>
        </button>

        <button className={styles.icon_btn} onClick={onSettings}>
          <IconButton iconName={"Setting"} />

          <span className="icon_button_text">설정</span>
        </button>
      </div>
    </section>
  );
}
