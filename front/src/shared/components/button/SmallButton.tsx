import { type ButtonHTMLAttributes } from "react";
import styles from "./SmallButton.module.scss";
import clsx from "clsx";

type Props = {
  styleType: "PRIMARY" | "OUTLINE";
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 *@description 작은 버튼 컴포넌트 ui
 */
export function SmallButton({ styleType, ...props }: Props) {
  return (
    <button
      className={clsx(styles.button, styleType === "PRIMARY" ? styles.primary : styles.outline)}
      {...props}
    />
  );
}
