import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ActionSheet.module.scss";
import { ensurePortalRoot } from "@/shared/utils/portal";

type Props = {
  open: boolean;
  onClose: () => void;
  onClickFirst?: () => void;
  onClickSecond?: () => void;
  onClickThird?: () => void;
  firstText?: string;
  secondText?: string;
  thirdText?: string;
  title?: string;
  destructive?: "first" | "second" | "third";
};

export default function ActionSheet({
  open,
  onClose,
  onClickFirst,
  onClickSecond,
  onClickThird,
  firstText,
  secondText,
  thirdText,
  title,
  destructive,
}: Props) {
  // ---- 하위호환 매핑 ----
  const handleFirst = onClickFirst;
  const handleSecond = onClickSecond;
  const handleThird = onClickThird;
  const labelFirst = firstText;
  const labelSecond = secondText;
  const labelThird = thirdText;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const root = ensurePortalRoot("overlay-root");

  return createPortal(
    <div className={styles.wrap} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()} // 안쪽 클릭은 전파 막음
      >
        {title && <div className={styles.title}>{title}</div>}

        <button
          className={`${styles.item} ${destructive === "first" ? styles.destructive : ""}`}
          type="button"
          onClick={handleFirst}
        >
          {labelFirst}
        </button>

        {labelSecond && (
          <button
            className={`${styles.item} ${destructive === "second" ? styles.destructive : ""}`}
            type="button"
            onClick={handleSecond}
          >
            {labelSecond}
          </button>
        )}

        {labelThird && (
          <button
            className={`${styles.item} ${destructive === "third" ? styles.destructive : ""}`}
            type="button"
            onClick={handleThird}
          >
            {labelThird}
          </button>
        )}
      </div>
    </div>,
    root,
  );
}
