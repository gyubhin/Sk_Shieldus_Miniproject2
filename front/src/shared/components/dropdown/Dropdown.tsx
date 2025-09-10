import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import { IconButton } from "../icon/IconButton";
import type { DropdownOption } from "@/shared/types/ui";
import clsx from "clsx";

type Props = {
  options: DropdownOption[];
  defaultValue?: DropdownOption;

  // 변경 콜백
  onChange?: (value: DropdownOption) => void;
  isWideStyle?: boolean;
};

/**
 * @description Dropdown 컴포넌트
 */
export function Dropdown({ options, defaultValue, onChange, isWideStyle }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 값 선택
  const handleSelect = (value: DropdownOption) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setIsOpen((prev) => !prev)} type="button">
        <IconButton iconName={"Below"} size={12} />

        <span>{selected.label}</span>
      </button>

      {isOpen && (
        <ul className={clsx(styles.menu, isWideStyle && styles.wide_menu)}>
          {options.map((option, idx) => (
            <li key={idx} className={styles.item} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
