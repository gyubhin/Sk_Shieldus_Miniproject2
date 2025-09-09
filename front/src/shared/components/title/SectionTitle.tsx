import styles from "./SectionTitle.module.scss";

type Props = {
  title: string;
  rightActionLabel?: string;
  onActionClick?: () => void;
};

/**
 *@description 섹션 타이틀 컴포넌트
 *@param rightActionLabel 우측 텍스트 버튼
 */
export function SectionTitle({ title, rightActionLabel, onActionClick }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {rightActionLabel && (
        <button className={styles.action} onClick={onActionClick}>
          {rightActionLabel}
        </button>
      )}
    </div>
  );
}
