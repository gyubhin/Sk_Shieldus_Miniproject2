import { type ButtonHTMLAttributes } from "react";
import styles from "./DropdownButton.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";

type Props = {
  name: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 *@description dropdown 버튼 (필터로 사용)

 */
export function DropdownButton({ name, className, ...props }: Props) {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      <IconButton iconName={"Below"} />

      <span>{name}</span>
    </button>
  );
}
