import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalConfirm.module.scss";

type Props = {
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void; // 취소/딤 클릭/ESC
};

export default function ModalConfirm({
  open,
  title = "정말로 삭제하시겠습니까?",
  confirmText = "삭제",
  cancelText = "취소",
  onConfirm,
  onClose,
}: Props) {
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    firstBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // 스크롤 잠금

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const root = document.getElementById("overlay-root")!;
  return createPortal(
    <div className={styles.backdrop} onClick={onClose} aria-hidden>
      {/* 딤 클릭 시 닫히게 하고, 카드 안에서의 클릭은 전파 중단 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.title}>{title}</p>
        <div className={styles.actions}>
          <button
            ref={firstBtnRef}
            className={styles.primary}
            type="button"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className={styles.ghost} type="button" onClick={onClose}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    root
  );
}
