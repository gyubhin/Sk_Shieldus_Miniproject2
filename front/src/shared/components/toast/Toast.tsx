import { useEffect } from "react";
import styles from "./Toast.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";
import { useUiStore } from "@/shared/stores/ui.store";

/**
 *@description 토스트 ui 컴포넌트
 */
export default function Toast() {
  const { toast, clearToast } = useUiStore();

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => clearToast(), 2000);
    return () => clearTimeout(t);
  }, [toast.show, clearToast]);

  if (!toast.show) return null;

  const className = clsx(styles.toast, styles["top-center"], styles[toast.type]);

  const ariaRole = toast.type === "error" ? "alert" : "status";
  const ariaLive = toast.type === "error" ? "assertive" : "polite";

  return (
    <div className={className} role={ariaRole} aria-live={ariaLive} data-type={toast.type}>
      <span className={styles.message}>{toast.message}</span>

      <button className={styles.closeBtn} onClick={clearToast} aria-label="닫기" type="button">
        <IconButton iconName={"Close"} fill={"#fff"} />
      </button>
    </div>
  );
}
