import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import styles from "./InputField.module.scss";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  successMessage?: string;
  errorMessage?: string;
  required?: boolean;
  previewUrl?: string | null; // 서버에서 받은 기존 이미지 URL
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({
  label,
  required,
  name,
  successMessage,
  errorMessage,
  className,
  type = "text",
  previewUrl,
  ...rest
}: Props) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    rest.onChange?.(e);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        <span>{label}</span>
        {required ? "*" : ""}
      </label>

      {type === "file" ? (
        <>
          <input
            id={name}
            name={name}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleFileChange}
            {...rest}
          />

          <label htmlFor={name} className={styles.uploadButton}>
            이미지 선택
          </label>

          {previewUrl && (
            <img
              src={`${import.meta.env.VITE_APP_IMG_BASE_URL}${previewUrl}`}
              alt="미리보기"
              className={styles.preview}
            />
          )}
        </>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={clsx(
            styles.input,
            errorMessage && styles.invalid,
            successMessage && styles.success,
            className,
          )}
          accept={type === "file" ? "image/jpeg, image/png, image/svg+xml" : undefined}
          aria-invalid={!!errorMessage}
          {...rest}
        />
      )}

      {successMessage && <span className={styles.success}>{successMessage}</span>}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
