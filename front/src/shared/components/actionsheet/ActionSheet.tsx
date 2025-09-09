import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ActionSheet.module.scss";

type Props = {
  open: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  editText?: string;
  deleteText?: string;
  title?: string;
};

export default function ActionSheet({
  open,
  onEdit,
  onDelete,
  onClose,
  editText = "수정",
  deleteText = "삭제",
  title,
}: Props) {
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
  const root = document.getElementById("overlay-root")!;

  return createPortal(
    <div className={styles.wrap} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <div className={styles.title}>{title}</div>}
        <button className={styles.item} type="button" onClick={onEdit}>
          {editText}
        </button>
        <button
          className={`${styles.item} ${styles.destructive}`}
          type="button"
          onClick={onDelete}
        >
          {deleteText}
        </button>
        <button className={styles.cancel} type="button" onClick={onClose}>
          취소
        </button>
      </div>
    </div>,
    root
  );
}
