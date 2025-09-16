import { Link, useNavigate } from "react-router-dom";
import { SmallButton } from "../button/SmallButton";
import styles from "./Header.module.scss";
import { useAccessTokenStore } from "@/features/auth";
import useIsMobile from "@/shared/hooks/useIsMobile";
import { IconButton } from "../icon/IconButton";
import { useEffect, useState } from "react";
import { usePostLogoutApi } from "@/features/auth/_hooks/mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import { useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";

/**
 *@description 헤더 컴포넌트
 * - 좌측: 로고
 * - 우측: 주요 액션 버튼 (팀원 모집, 로그인)
 */
export function Header() {
  const navigate = useNavigate();
  const { isLogin, reset } = useAccessTokenStore();
  const { mutateAsync } = usePostLogoutApi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showToast } = useUiStore();
  const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 로고 이스터에그 (5번 연속 클릭)
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    if (logoClickCount === 5) {
      navigate("/egg"); // 원하는 페이지 경로
      setLogoClickCount(0); // 초기화
    }
  }, [logoClickCount, navigate]);

  const handleLogoClick = () => {
    setLogoClickCount((prev) => prev + 1);

    // 일정 시간(예: 1.5초) 내에 5번 누르지 않으면 초기화
    setTimeout(() => {
      setLogoClickCount(0);
    }, 1500);
  };

  // 로그인/로그아웃 버튼 이벤트
  const onLoginButtonClick = () => {
    if (isLogin) {
      // 로그인된 상태 -> 로그아웃 api 호출
      mutateAsync()
        .then((res) => {
          if (res.status === 200) {
            showToast({ message: "로그아웃되었습니다.", type: "success" });
            queryClient.removeQueries({
              queryKey: [reactQueryKeys.user.getUserInfo],
            });

            navigate("/");
            reset(); // 토큰 삭제
          }
        })
        .catch(() => {
          queryClient.removeQueries({
            queryKey: [reactQueryKeys.user.getUserInfo],
          });

          showToast({ message: "잘못된 접근입니다.", type: "error" });
          navigate("/");
        });
    } else {
      // 로그아웃된 상태 -> 로그인 페이지 이동
      navigate("/");
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <button onClick={handleLogoClick}>
        <img src="/images/ImageLogo.svg" alt="HobbyHub 로고" className={styles.logo_icon} />
      </button>

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
