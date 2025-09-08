import { SmallButton } from "../button/SmallButton";
import styles from "./Header.module.scss";

type Props = {};

/**
 *@description 헤더 컴포넌트
 */
export function Header({}: Props) {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src="/logo.svg" alt="HobbyHub 로고" className={styles.logoIcon} />
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <SmallButton styleType={"PRIMARY"}>팀원 모집하기</SmallButton>
        <SmallButton styleType={"OUTLINE"}>팀원 모집하기</SmallButton>
      </div>
    </header>
  );
}
