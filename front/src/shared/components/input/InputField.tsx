import { type InputHTMLAttributes } from "react";
import styles from "./InputField.module.scss";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  successMessage?: string;
  errorMessage?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({
  label,
  required,
  name,
  successMessage,
  errorMessage,
  className,
  ...rest // <-- 나머지 props (type, value, onChange, placeholder, autoComplete 등)
}: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        <span>{label}</span>
        {required ? "*" : ""}
      </label>

      <input
        id={name}
        name={name}
        // 외부에서 넣는 className도 병합
        className={clsx(
          styles.input,
          errorMessage && styles.invalid,
          successMessage && styles.success,
          className
        )}
        aria-invalid={!!errorMessage}
        {...rest} // <-- 반드시 넘겨주기!
      />

      {successMessage && <span className={styles.success}>{successMessage}</span>}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
