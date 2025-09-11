import { useState } from "react";
import styles from "./LabeledDropdown.module.scss";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  onChange: (value: string) => void;
  successMessage?: string;
  errorMessage?: string;
};

export function LabeledDropdown({
  label,
  placeholder,
  options,
  required,
  onChange,
  successMessage,
  errorMessage,
}: Props) {
  const [selected, setSelected] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className={styles.dropdown_wrapper}>
      <label className={styles.dropdown_label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <select className={styles.dropdown_select} value={selected} onChange={handleChange}>
        <option value="" disabled>
          {placeholder ?? "선택해주세요."}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {successMessage && <span className={styles.success}>{successMessage}</span>}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
