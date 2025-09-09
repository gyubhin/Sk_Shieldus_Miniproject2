import styles from "./CheckField.module.scss";

import { IconButton } from "../icon/IconButton";

type Props = {
  isCheck: boolean;
  label: string;
};

/**
 *@description 체크형식 입력 필드
 *@param isCheck 체크여부
 */
function CheckField({ isCheck, label }: Props) {
  return (
    <div className={styles.check_field}>
      <IconButton
        fill={isCheck ? "#f36438" : "#ADADAD"}
        size={20}
        iconName={isCheck ? "FillCheckCircle" : "StrokeCheckCircle"}
      />

      <p>{label}</p>
    </div>
  );
}

export default CheckField;
