import { type ButtonHTMLAttributes } from "react";
import styles from "./ActiveButton.module.scss";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 *@description 활성화 버튼 컴포넌트
 */
export function ActiveButton({ className, ...props }: Props) {
  return <button className={clsx(styles.button, className)} {...props} />;
}
