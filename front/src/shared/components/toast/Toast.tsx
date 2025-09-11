import React, { useEffect } from "react";
import styles from "./Toast.module.scss";
import clsx from "clsx";

type ToastType = "success" | "error";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

type ToastProps = {
  message: string;
  type: ToastType;            // success / error 필수
  duration?: number;          // 기본 3000ms
  position?: ToastPosition;   // 기본 bottom-right
  onClose: () => void;
};

export default function Toast({
  message,
  type,
  duration = 3000,
  position = "bottom-right",
  onClose,
}: ToastProps) {
  // 자동 닫힘 타이머
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);


  const className = clsx(styles.toast, styles[position], styles[type]);

  // 접근성 분기
  const ariaRole = type === "error" ? "alert" : "status";
  const ariaLive = type === "error" ? "assertive" : "polite";

  return (
    <div className={className} role={ariaRole} aria-live={ariaLive} data-type={type}>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="닫기"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
