"use client";

import clsx from "clsx";
import styles from "./IconButton.module.scss";
import React from "react";
import { BsArrowLeft, BsChevronDown, BsSearch } from "react-icons/bs";

const Icon = {
  Below: BsChevronDown,
  Search: BsSearch,
  Left: BsArrowLeft,
} as const;

type IconKey = keyof typeof Icon;

type Props = {
  iconName: IconKey;
  onClick?: () => void;
  size?: number;
  color?: string;
  fill?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 *@description 아이콘 통합 관리 button 컴포넌트
 */
export function IconButton({
  iconName,
  onClick,
  size = 20,
  color,
  fill,
  className,
  disabled,
  ariaLabel,
}: Props) {
  const SelectedIcon = Icon[iconName];
  const onKeydown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) onClick();
    }
  };

  const _onClick = () => {
    if (disabled) return;

    if (onClick) onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={_onClick}
      onKeyDown={onKeydown}
      aria-label={ariaLabel}
      className={clsx(styles.icon_button, disabled && styles.icon_button_disabled, className)}
    >
      <SelectedIcon size={size} color={color} fill={fill} />
    </div>
  );
}
