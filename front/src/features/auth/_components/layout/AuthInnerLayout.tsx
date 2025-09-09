import { type ReactNode } from "react";
import styles from "./AuthInnerLayout.module.scss";

type Props = {
  children: ReactNode;
};

/**
 * @description 로그인, 회원가입, 개인정보 처리 방침 레이아웃 컴포넌트
 */
export function AuthInnerLayout({ children }: Props) {
  return <section className={styles.inner_layout}>{children}</section>;
}
