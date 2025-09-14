import styles from "./GroupBanner.module.scss";

type Props = {
  url?: string;
};

/**
 *@description 그룹 정보 페이지 > 상단 그룹 대표 이미지
 */
function GroupBanner({ url }: Props) {
  return (
    <div className={styles.group_banner}>
      {url ? (
        <img src={url} alt={"group_banner"} />
      ) : (
        <div className={styles.placeholder}>no image</div>
      )}
    </div>
  );
}

export default GroupBanner;
