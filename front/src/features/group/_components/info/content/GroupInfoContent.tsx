import Tag from "@/shared/components/tag/Tag";
import styles from "./GroupInfoContent.module.scss";

type Props = {};

/**
 *@description 모임 정보 페이지 > 모입 정보 (이름, 인원수, 소개, 태그, 장소)
 */
function GroupInfoContent({}: Props) {
  return (
    <section className={styles.group_content}>
      {/* 모임 이름 + 탈퇴 버튼 */}
      <div className={styles.top_view}>
        <h2>수원 주말 영어 스터디 모임</h2>

        <button>탈퇴하기</button>
      </div>

      {/* 장소, 멤버 인원수 */}
      <div className={styles.group_sub_info_view}>
        <span>수원시</span>
        <span>멤버 {"103"}</span>
      </div>

      {/* 태그 */}
      <div className={styles.tags_view}>
        <Tag name={"파이썬1"} />
        <Tag name={"파이썬"} />
      </div>

      {/* 모임 소개글 */}
      <div className={styles.instruction}>
        <h3>모임 소개</h3>

        <p>
          영어를 좋아하는 사람들이 모여서 함께 즐겁게 영어를 즐깁니다. 영어를 좋아하는 사람들이
          모여서 함께 즐겁게 영어를 즐깁니다. 영어를 좋아하는 사람들이 모여서 함께 즐겁게 영어를
          즐깁니다. 영어를 좋아하는 사람들이 모여서 함께 즐겁게 영어를 즐깁니다. 영어를 좋아하는
          사람들이 모여서 함께 즐겁게 영어를 즐깁니다. 영어를 좋아하는 사람들이 모여서 함께 즐겁게
          영어를 즐깁니다. 영어를 좋아하는 사람들이 모여서 함께 즐겁게 영어를 즐깁니다. 영어를
          좋아하는 사람들이 모여서 함께 즐겁게 영어를 즐깁니다. 영어를 좋아하는 사람들이 모여서 함께
          즐겁게 영어를 즐깁니다. 영어를 좋아하는 사람들이 모여서 함께 즐겁게 영어를 즐깁니다.
        </p>
      </div>
    </section>
  );
}

export default GroupInfoContent;
