import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./MyProfileView.module.scss";
import type { GetUserInfoResponse } from "../../_types/response";
import { getImageUrl } from "@/libs/image";

type Props = {
  onEditProfile?: () => void;
  onSettings?: () => void;
  userData?: GetUserInfoResponse;
};

/**
 *@description 마이페이지 > 상단 프로필 뷰
 */
export function MyProfileView({ onEditProfile, onSettings, userData }: Props) {
  return (
    <section className={styles.container}>
      {/* 왼쪽: 아바타 + 버튼 */}
      <div className={styles.left}>
        <div className={styles.profile_img_wrapper}>
          <img
            src={
              userData?.profileImageUrl
                ? getImageUrl(userData?.profileImageUrl)
                : "/images/ImageProfileDefault.svg"
            }
            alt="프로필"
            className={
              userData?.profileImageUrl ? styles.profile_image : styles.profile_default_image
            }
          />
        </div>

        <button className={styles.edit_btn} onClick={onEditProfile}>
          프로필 수정
        </button>
      </div>

      {/* 중앙: 닉네임, 소개, 카운트 */}
      <div className={styles.center}>
        <p className={styles.description}>{userData?.introduction ?? ""}</p>
        <p className={styles.nickname}>{userData?.nickname ?? ""}</p>

        <div className={styles.counts}>
          <div className={styles.count}>
            <span className={styles.number}>{userData?.postCount ?? 0}</span>
            <span className={styles.label}>게시물</span>
          </div>

          <div className={styles.count}>
            <span className={styles.number}>{userData?.commentCount ?? 0}</span>
            <span className={styles.label}>댓글</span>
          </div>
        </div>
      </div>

      {/* 오른쪽: 동네 수정, 설정 */}
      <div className={styles.right}>
        <button className={styles.icon_btn} onClick={onSettings}>
          <IconButton iconName={"Setting"} />

          <span className="icon_button_text">설정</span>
        </button>
      </div>
    </section>
  );
}
