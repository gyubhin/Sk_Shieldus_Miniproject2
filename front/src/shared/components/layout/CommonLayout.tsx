import { type ReactNode } from "react";
import styles from "./CommonLayout.module.scss";
import { BottomTab } from "../tab/BottomTab";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

/**
 * @description 공통 레이아웃 컴포넌트
 * - 중앙 1100px 컨테이너, 반응형 대응
 * - Header, Footer는 필요 시 별도 컴포넌트로 포함 가능
 */
export function CommonLayout({ children }: Props) {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <main className={styles.container}>{children}</main>

      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/privacy" && <BottomTab />}
    </div>
  );
}
