import Tag from "@/shared/components/tag/Tag";
import styles from "./GroupInfoContent.module.scss";
import type { GroupsItem } from "@/features/group/_types/base";
import LikeButton from "@/shared/components/button/LikeButton";
import {
  useDeleteGroupsLeaveApi,
  usePostGroupsJoinApi,
  usePostGroupsLike,
} from "@/features/group/_hooks/mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import type { ErrorResponse } from "react-router-dom";
import { isAxiosError } from "axios";

type Props = {
  data: GroupsItem;
  refetchGroupsOne: () => void;
  refetchMembers: () => void;
};

/**
 *@description 모임 정보 페이지 > 모입 정보 (이름, 인원수, 소개, 태그, 장소)
 */
function GroupInfoContent({ data, refetchGroupsOne, refetchMembers }: Props) {
  const { mutateAsync: mutateJoin } = usePostGroupsJoinApi();
  const { mutateAsync: mutateLeave } = useDeleteGroupsLeaveApi();
  const { mutateAsync: mutateLike } = usePostGroupsLike();
  const { showToast } = useUiStore();

  // 모임 가입 이벤트
  const onJoin = async () => {
    try {
      const res = await mutateJoin(data.id);

      if (res.status === 200) {
        showToast({ message: "가입 신청이 완료되었습니다.", type: "success" });

        refetchMembers();
        refetchGroupsOne();
      }
    } catch (error) {
      let message = "";
      if (isAxiosError<ErrorResponse>(error)) {
        if (error.status === 409) {
          message = "이미 가입된 모임입니다.";
        } else if (error.status === 404) {
          message = "모임을 찾을 수 없습니다.";
        } else {
          message = "잘못된 접근입니다.";
        }
      }

      showToast({ message, type: "error" });
    }
  };

  // 모임 탈퇴 이벤트
  const onLeave = async () => {
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        const res = await mutateLeave(data.id);

        if (res.status === 200) {
          showToast({ message: "모임 탈퇴가 완료되었습니다.", type: "success" });
          refetchMembers();
          refetchGroupsOne();
        }
      } catch (error) {
        let message = "";
        if (isAxiosError<ErrorResponse>(error)) {
          if (error.status === 403) {
            message = "모임장은 탈퇴할 수 없습니다.";
          } else if (error.status === 404) {
            message = "모임을 찾을 수 없습니다.";
          } else {
            message = "잘못된 접근입니다.";
          }
        }

        showToast({ message, type: "error" });
      }
    }
  };

  // 좋아요 클릭
  const onHeartTogggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    mutateLike(data.id)
      .then((res) => {
        if (res.status === 200) {
          refetchGroupsOne();
          showToast({
            message: res.data.liked ? "찜했습니다." : "찜 해제했습니다.",
            type: "success",
          });
        }
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          if (error.status === 403) {
            showToast({ message: "접근 권한이없습니다.", type: "error" });
          }
        }
      });
  };

  return (
    <section className={styles.group_content}>
      {/* 모임 이름 + 탈퇴 버튼 */}
      <div className={styles.top_view}>
        <div className={styles.top_view_left}>
          <h2>{data.name}</h2>

          <button onClick={onHeartTogggle}>
            <LikeButton isLike={data.liked} />
          </button>
        </div>

        <button onClick={data?.joined ? onLeave : onJoin}>
          {data?.joined ? "탈퇴하기" : "가입하기"}
        </button>
      </div>

      {/* 장소, 멤버 인원수 */}
      <div className={styles.group_sub_info_view}>
        <span>{data.region}</span>
        <span>{data.categoryName}</span>
        <span>
          멤버 ({data.currentMembers} / {data.maxMembers})
        </span>
      </div>

      {/* 태그 */}
      <div className={styles.tags_view}>
        {data.tags !== "" &&
          data.tags.split(",").map((tag, i) => <Tag name={tag} key={`${tag}_${i}`} />)}
      </div>

      {/* 모임 소개글 */}
      <div className={styles.instruction}>
        <h3>모임 소개</h3>

        <p>{data.description}</p>
      </div>
    </section>
  );
}

export default GroupInfoContent;
