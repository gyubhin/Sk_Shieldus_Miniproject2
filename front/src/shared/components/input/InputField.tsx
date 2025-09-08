import { type InputHTMLAttributes } from "react";
import styles from "./InputField.module.scss";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  successMessage?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 *@description common input field (with label + input + message)
 */
export function InputField({ label, name, successMessage, errorMessage }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        className={clsx(
          styles.input,
          errorMessage && styles.invalid,
          successMessage && styles.success,
        )}
      />

      {successMessage && <span className={styles.success}>{successMessage}</span>}

      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
