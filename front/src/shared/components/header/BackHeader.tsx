import { useNavigate } from "react-router-dom";
import { IconButton } from "../icon/IconButton";
import styles from "./BackHeader.module.scss";

type Props = {
  title: string;
  onBackEvent?: () => void;
};

/**
 *@description 뒤로가기 버튼 있는 헤더 컴포넌트
 */
export function BackHeader({ title, onBackEvent }: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    if (onBackEvent) {
      onBackEvent();
    }

    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <button className={styles.back_button} onClick={goBack} aria-label="뒤로가기">
        <IconButton iconName="Left" fill={"#383E4A"} />
      </button>

      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
