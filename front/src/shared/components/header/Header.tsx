import { SmallButton } from "../button/SmallButton";
import styles from "./Header.module.scss";

/**
 *@description 헤더 컴포넌트
 * - 좌측: 로고
 * - 우측: 주요 액션 버튼 (팀원 모집, 로그인)
 */
export function Header() {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <img src="/images/ImageLogo.svg" alt="HobbyHub 로고" className={styles.logo_icon} />

      <div className={styles.actions}>
        <SmallButton styleType={"PRIMARY"}>팀원 모집하기</SmallButton>
        <SmallButton styleType={"OUTLINE"}>로그인</SmallButton>
      </div>
    </header>
  );
}
