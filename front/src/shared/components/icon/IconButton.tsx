"use client";

import clsx from "clsx";
import styles from "./IconButton.module.scss";
import React from "react";
import {
  BsChevronDown,
  BsSearch,
  BsFillPersonFill,
  BsFillGeoAltFill,
  BsHeart,
  BsFillHeartFill,
  BsChevronLeft,
  BsStar,
  BsBook,
  BsChatSquare,
} from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

const Icon = {
  Below: BsChevronDown,
  Search: BsSearch,
  Left: BsChevronLeft,
  Person: BsFillPersonFill,
  Marker: BsFillGeoAltFill,
  StrokeHeart: BsHeart,
  FillHeart: BsFillHeartFill,
  More: IoIosMore,
  Home: IoHomeOutline,
  Star: BsStar,
  Book: BsBook,
  Bubble: BsChatSquare,
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
