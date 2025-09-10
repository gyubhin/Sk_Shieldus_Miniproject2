import styles from "./Tag.module.scss";

type Props = {
  name: string;
  onDelete?: () => void;
};

/**
 *@description 태그 공통 컴포넌트
 */
function Tag({ name, onDelete }: Props) {
  return (
    <span className={styles.tag} onClick={onDelete}>
      #{name}
      {onDelete && <span className={styles.delete_button}>x</span>}
    </span>
  );
}

export default Tag;
