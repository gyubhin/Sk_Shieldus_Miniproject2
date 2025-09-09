import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ActionSheet.module.scss";
import { ensurePortalRoot } from "@/shared/utils/portal";

type Props = {
  open: boolean;
  onClose: () => void;

  // ✅ 중립 프롭
  onClickFirst?: () => void;
  onClickSecond?: () => void;
  firstText?: string;   // default: "수정"
  secondText?: string;  // default: "삭제"
  title?: string;
  destructive?: "first" | "second";

  // ⛳️ 하위호환
  onEdit?: () => void;
  onDelete?: () => void;
  editText?: string;
  deleteText?: string;
};

export default function ActionSheet({
  open,
  onClose,

  // 새 프롭
  onClickFirst,
  onClickSecond,
  firstText,
  secondText,
  title,
  destructive,

  // 하위호환
  onEdit,
  onDelete,
  editText,
  deleteText,
}: Props) {
  // ---- 하위호환 매핑 ----
  const handleFirst = onClickFirst ?? onEdit;
  const handleSecond = onClickSecond ?? onDelete;

  // 기본 라벨을 "수정" / "삭제"로
  const labelFirst = firstText ?? editText ?? "수정";
  const labelSecond = secondText ?? deleteText ?? "삭제";

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
          className={`${styles.item} ${
            destructive === "first" ? styles.destructive : ""
          }`}
          type="button"
          onClick={handleFirst}
        >
          {labelFirst}
        </button>

        <button
          className={`${styles.item} ${
            destructive === "second" ? styles.destructive : ""
          }`}
          type="button"
          onClick={handleSecond}
        >
          {labelSecond}
        </button>

        
      </div>
    </div>,
    root
  );
}
