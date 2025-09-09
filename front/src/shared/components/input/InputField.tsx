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
 * @prop label 입력 필드 라벨 텍스트
 * @prop name input name/id 값 (label과 연결)
 * @prop successMessage 성공 시 표시할
 * @prop errorMessage 에러 시 표시할 메시지
 *
 * @example
 * <InputField
 *   label="이메일"
 *   name="email"
 *   type="email"
 *   placeholder="이메일을 입력하세요"
 *   errorMessage="올바른 이메일 형식이 아닙니다."
 * />
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
