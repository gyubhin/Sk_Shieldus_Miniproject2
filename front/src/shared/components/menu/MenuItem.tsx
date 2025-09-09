import styles from "./MenuItem.module.scss";
import { type ReactNode } from "react";

type Props = {
  label: string;
  right?: string | ReactNode;
  onClick?: () => void;
};

/**
 *@description 메뉴 항목 컴포넌트
 *@param right 해당 타입이 string이면 텍스트 표시하고, 아니면 아이콘 props로 받음
 */
export function MenuItem({ label, right, onClick }: Props) {
  return (
    <div className={styles.item} onClick={onClick}>
      <span className={styles.label}>{label}</span>

      {typeof right === "string" ? (
        <span className={styles.right_text}>{right}</span>
      ) : (
        right && <div className={styles.right_icon}>{right}</div>
      )}
    </div>
  );
}
