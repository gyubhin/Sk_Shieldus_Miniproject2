import { IconButton } from "@/shared/components/icon/IconButton";
import styles from "./ScheduleItem.module.scss";

type Props = {
  title: string;
  time: string;
  location: string;
  imageUrl?: string;
  onMoreClick?: () => void;
};

/**
 *@description 일정 항목
 *@param time 일정 시간
 *@param location 장소
 *@param imageUrl 일정 이미지
 *@example
 * <ScheduleItem
 *   title="토요일 스터디 모임"
 *   time="내일 오전 11:00"
 *   location="당산역 커피점"
 *   imageUrl="https://placehold.co/100x100"
 *   onMoreClick={() => console.log("더보기 클릭")}
 * />
 */
export function ScheduleItem({ title, time, location, imageUrl, onMoreClick }: Props) {
  return (
    <div className={styles.card}>
      {/* 썸네일 */}
      <div className={styles.thumbnail}>
        {imageUrl ? <img src={imageUrl} alt={title} /> : <div className={styles.placeholder} />}
      </div>

      {/* 정보 */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>

          <button className={styles.more_btn} onClick={onMoreClick}>
            <IconButton iconName="More" size={18} />
          </button>
        </div>

        <div className={styles.info}>
          <p className={styles.time}>{time}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
    </div>
  );
}
