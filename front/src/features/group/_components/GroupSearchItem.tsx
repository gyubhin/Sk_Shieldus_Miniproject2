import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./GroupSearchItem.module.scss";
import React, { useState } from "react";
import Tag from "@/shared/components/tag/Tag";
import { useNavigate } from "react-router-dom";
import type { GroupsItem } from "../_types/base";
import dayjs from "dayjs";
import LikeButton from "@/shared/components/button/LikeButton";
import { usePostGroupsLike } from "../_hooks/mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import { isAxiosError } from "axios";
import { getImageUrl } from "@/libs/image";

type Props = {
  data: GroupsItem;
  refetch: () => void;
};

/**
 *@description 모임 검색 항목
 */
export function GroupSearchItem({ data, refetch }: Props) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const { showToast } = useUiStore();

  const { mutateAsync: mutateLike } = usePostGroupsLike();

  const onClickGroup = () => {
    navigate(`/group/${data.id}/info`);
  };

  // 그룹 들어가기
  const onKeyDownGroup = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onClickGroup();
    }
  };

  // 좋아요 클릭
  const onHeartTogggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    mutateLike(data.id)
      .then((res) => {
        if (res.status === 200) {
          refetch();
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
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={onClickGroup}
      onKeyDown={onKeyDownGroup}
    >
      {/* 이미지 */}
      {data.imageUrl && (
        <img src={`${getImageUrl(data.imageUrl)}`} alt={data.name} className={styles.image} />
      )}
      {!data.imageUrl && (
        <img src={"https://placehold.co/300x200"} alt={"대체 이미지"} className={styles.image} />
      )}

      {/* 본문 */}
      <div className={styles.content}>
        <h3 className={styles.title}>{data.name}</h3>
        <p className={styles.description}>{data.description}</p>

        {/* 태그 */}
        <div className={styles.tags}>
          <Tag name={data.categoryName} />

          {data.tags.split(",").map((tag, i) => (
            <React.Fragment key={i}>
              <Tag name={tag} />
            </React.Fragment>
          ))}
        </div>

        {/* 정보 */}
        <div className={styles.info}>
          <div className={styles.members}>
            <IconButton fill="#7f838c" size={18} iconName={"Person"} />

            <p>
              {data.currentMembers}/{data.maxMembers}
            </p>
          </div>

          <div className={styles.region}>
            <IconButton fill="#7f838c" size={16} iconName={"Marker"} />

            <p>{data.region}</p>
          </div>
        </div>

        {/* 날짜 */}
        <div className={styles.date}>{dayjs(data.createdAt).format("YYYY.MM.DD")}</div>

        <button className={styles.heart} onClick={onHeartTogggle}>
          <LikeButton isLike={data.liked} />
        </button>
      </div>
    </div>
  );
}
