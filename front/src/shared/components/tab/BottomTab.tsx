import styles from "./BottomTab.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";
import { useState } from "react";

type ActveKey = "home" | "group" | "mypage";

/**
 *@description 하단 탭 컴포넌트
 *@param actvieKey 활성화된 탭 키
 */
export function BottomTab() {
  const [activeKey, setActvieKey] = useState<ActveKey>();

  const onTabClick = (_key: ActveKey) => {
    setActvieKey(_key);
  };

  return (
    <nav className={styles.tab_bar}>
      <button
        key={"home"}
        className={clsx(styles.tab_item, activeKey === "home" && styles.active)}
        onClick={() => onTabClick("home")}
      >
        <IconButton
          size={20}
          iconName={"Home"}
          fill={activeKey === "home" ? "#f36438" : "#7f838c"}
        />
        <span className={styles.label}>메인</span>
      </button>

      <button
        key={"group"}
        className={clsx(styles.tab_item, activeKey === "group" && styles.active)}
        onClick={() => onTabClick("group")}
      >
        <IconButton
          size={20}
          iconName={"Star"}
          fill={activeKey === "group" ? "#f36438" : "#7f838c"}
        />
        <span className={styles.label}>내모임</span>
      </button>

      <button
        key={"mypage"}
        className={clsx(styles.tab_item, activeKey === "mypage" && styles.active)}
        onClick={() => onTabClick("mypage")}
      >
        <IconButton
          size={20}
          iconName={"Person"}
          fill={activeKey === "mypage" ? "#f36438" : "#7f838c"}
        />
        <span className={styles.label}>마이페이지</span>
      </button>
    </nav>
  );
}
