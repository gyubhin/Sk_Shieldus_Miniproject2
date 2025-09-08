import { type InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";

type Props = {
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *@description search input 컴포넌트
 */
export function SearchInput({ placeholder, className, ...props }: Props) {
  return (
    <div className={clsx(styles.container, className)}>
      <IconButton iconName={"Search"} />

      <input
        type="text"
        className={styles.input}
        placeholder={placeholder ?? "검색어를 입력하세요"}
        {...props}
      />
    </div>
  );
}
