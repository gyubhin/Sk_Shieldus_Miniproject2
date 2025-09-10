import { Link, useNavigate } from "react-router-dom";
import { SmallButton } from "../button/SmallButton";
import styles from "./Header.module.scss";
import { useAccessTokenStore } from "@/features/auth";
import useIsMobile from "@/shared/hooks/useIsMobile";
import { IconButton } from "../icon/IconButton";
import { useState } from "react";

/**
 *@description 헤더 컴포넌트
 * - 좌측: 로고
 * - 우측: 주요 액션 버튼 (팀원 모집, 로그인)
 */
export function Header() {
  const navigate = useNavigate();
  const { isLogin } = useAccessTokenStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 로그인/로그아웃 버튼 이벤트
  const onLoginButtonClick = () => {
    if (isLogin) {
      // 로그인된 상태 -> 로그아웃 api 호출
    } else {
      // 로그아웃된 상태 -> 로그인 페이지 이동
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link to="/">
        <img src="/images/ImageLogo.svg" alt="HobbyHub 로고" className={styles.logo_icon} />
      </Link>

      <div className={styles.actions}>
        {isMobile && <IconButton size={24} iconName={"Menu"} onClick={toggleMenu} />}

        {isMenuOpen && (
          <div className={styles.mobile_menu}>
            <Link to="/group/register">모임 생성하기</Link>
            <button onClick={onLoginButtonClick}>{!isLogin ? "로그인" : "로그아웃"}</button>
          </div>
        )}

        {!isMobile && (
          <Link to="/group/register">
            <SmallButton styleType={"primary"}>모임 생성하기</SmallButton>
          </Link>
        )}

        {!isMobile && (
          <SmallButton onClick={onLoginButtonClick} styleType={"outline"}>
            {!isLogin ? "로그인" : "로그아웃"}
          </SmallButton>
        )}
      </div>
    </header>
  );
}
