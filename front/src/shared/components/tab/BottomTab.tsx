import styles from "./BottomTab.module.scss";
import clsx from "clsx";
import { IconButton } from "../icon/IconButton";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ActveKey = "main" | "group" | "mypage";

/**
 *@description 하단 탭 컴포넌트
 *@param actvieKey 활성화된 탭 키
 */
export function BottomTab() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [activeKey, setActvieKey] = useState<ActveKey>(() => {
    if (pathname === "/" || pathname === "/search") {
      return "main" as ActveKey;
    } else if (pathname === "/group") {
      return "group" as ActveKey;
    } else {
      return "mypage" as ActveKey;
    }
  });

  const onTabClick = (_key: ActveKey) => {
    setActvieKey(_key);
    navigate(_key === "main" ? "/" : `/${_key}`);
  };

  return (
    <nav className={styles.tab_bar}>
      <button
        key={"main"}
        className={clsx(styles.tab_item, activeKey === "main" && styles.active)}
        onClick={() => onTabClick("main")}
      >
        <IconButton
          size={20}
          iconName={"Home"}
          fill={activeKey === "main" ? "#f36438" : "#7f838c"}
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
