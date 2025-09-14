import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./EventItem.module.scss";
import type { EventItem } from "@/features/event/_types/base";
import { SmallButton } from "@/shared/components/button/SmallButton";
import dayjs from "dayjs";

type Props = {
  data: EventItem;
  onDelete?: () => void;
  onManage?: () => void;
  onMoreClick?: () => void;
};

/**
 *@description 일정 항목
 *@param time 일정 시간
 *@param location 장소
 *@param imageUrl 일정 이미지
 *@example
 * <EventItem
 *   title="토요일 스터디 모임"
 *   time="내일 오전 11:00"
 *   location="당산역 커피점"
 *   imageUrl="https://placehold.co/100x100"
 *   onMoreClick={() => console.log("더보기 클릭")}
 * />
 */
export default function EventItem({ data, onDelete, onManage, onMoreClick }: Props) {
  return (
    <div className={styles.card}>
      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        {data?.imageUrl ? (
          <img src={data?.imageUrl} alt={data.title} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      {/* 정보 */}
      <div className={styles.content}>
        <h3 className={styles.title}>{data?.title ?? ""}</h3>

        <div className={styles.info}>
          <p className={styles.time}>{dayjs(data?.eventDate ?? "").format("YYYY.MM.DD")}</p>

          <p className={styles.location}>{data?.location ?? ""}</p>
        </div>
      </div>

      <div className={styles.actions}>
        {onDelete && (
          <SmallButton onClick={onDelete} styleType={"outline"}>
            삭제
          </SmallButton>
        )}

        {onManage && (
          <SmallButton onClick={onManage} styleType={"outline"}>
            모임원 관리
          </SmallButton>
        )}

        {onMoreClick && (
          <button className={styles.more_btn} onClick={onMoreClick}>
            <IconButton iconName="More" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
