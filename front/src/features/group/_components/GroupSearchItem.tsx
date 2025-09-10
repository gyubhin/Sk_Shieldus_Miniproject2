import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./GroupSearchItem.module.scss";
import React, { useState } from "react";
import Tag from "@/shared/components/tag/Tag";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  description: string;
  region: string;
  maxMembers: number;
  currentMembers: number;
  createdAt: string; // YYYY-MM-DD
  imageUrl?: string;
  tags?: string[];
  isHeart?: boolean;
};

/**
 *@description 모임 검색 항목
 */
export function GroupSearchItem({
  name,
  description,
  region,
  maxMembers,
  currentMembers,
  createdAt,
  imageUrl,
  tags = [],
  isHeart,
}: Props) {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(isHeart);

  const onClickGroup = () => {
    const id = 1;
    navigate(`/group/${id}/info`);
  };

  const onKeyDownGroup = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onClickGroup();
    }
  };

  const onHeartTogggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    setHeart((prev) => !prev);
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
      {imageUrl && <img src={imageUrl} alt={name} className={styles.image} />}

      {/* 본문 */}
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        {/* 태그 */}
        <div className={styles.tags}>
          {tags.map((tag, i) => (
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
              {currentMembers}/{maxMembers}
            </p>
          </div>

          <div className={styles.region}>
            <IconButton fill="#7f838c" size={16} iconName={"Marker"} />

            <p>{region}</p>
          </div>
        </div>

        {/* 날짜 */}
        <div className={styles.date}>{createdAt}</div>

        <button className={styles.heart} onClick={onHeartTogggle}>
          <IconButton fill={heart ? "#F36438" : "#C6C8CD"} iconName={"FillHeart"} />
        </button>
      </div>
    </div>
  );
}
