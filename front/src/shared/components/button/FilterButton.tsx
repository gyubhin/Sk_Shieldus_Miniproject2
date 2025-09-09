import { type ButtonHTMLAttributes } from "react";
import styles from "./FilterButton.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";

type Props = {
  label: string;
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 *@description 검색용 filter 버튼
 */
export function FilterButton({ label, active = false, className, ...props }: Props) {
  return (
    <button className={clsx(styles.button, active && styles.active, className)} {...props}>
      <IconButton iconName={"Below"} size={14} fill="#5D626D" />

      <span>{label}</span>
    </button>
  );
}
