import styles from "./Tag.module.scss";

type Props = {
  name: string;
};

/**
 *@description 태그 공통 컴포넌트
 */
function Tag({ name }: Props) {
  return <span className={styles.tag}>#{name}</span>;
}

export default Tag;
