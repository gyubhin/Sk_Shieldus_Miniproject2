import { type ButtonHTMLAttributes } from "react";
import styles from "./DropdownButton.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";

type Props = {
  name: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function DropdownButton({ name, fullWidth, className, ...props }: Props) {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      <IconButton iconName={"Below"} />
      <span>{name}</span>
    </button>
  );
}
