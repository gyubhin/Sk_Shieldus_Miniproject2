import { IconButton } from "../icon/IconButton";
import styles from "./BackHeader.module.scss";

type Props = {
  title: string;
  onBack: () => void;
};

export function BackHeader({ title, onBack }: Props) {
  return (
    <header className={styles.header}>
      <button className={styles.back_button} onClick={onBack} aria-label="뒤로가기">
        <IconButton iconName="Left" />
      </button>

      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
