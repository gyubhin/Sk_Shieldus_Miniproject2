import { IconButton } from "../../../shared/components/icon/IconButton";
import styles from "./MypageInnerTab.module.scss";
import clsx from "clsx";

type Props = {
  activeKey: string;
  onChange: (key: string) => void;
};

/**
 *@description 마이페이지 > 유저 찜한 그룹, 게시글, 댓글 tab list 컴포넌트
 *@param actvieKey 활성화된 탭 키
 */
export function MypageInnerTab({ activeKey, onChange }: Props) {
  return (
    <nav className={styles.tab_container}>
      <button
        key={"wish"}
        className={clsx(styles.tab, activeKey === "wish" && styles.active)}
        onClick={() => onChange("wish")}
      >
        <IconButton iconName={"StrokeHeart"} fill={activeKey === "wish" ? "#f36438" : "#7f838c"} />

        <span>찜한 그룹</span>
      </button>

      <button
        key={"mypost"}
        className={clsx(styles.tab, activeKey === "mypost" && styles.active)}
        onClick={() => onChange("mypost")}
      >
        <IconButton iconName={"Book"} fill={activeKey === "mypost" ? "#f36438" : "#7f838c"} />

        <span>게시글</span>
      </button>

      <button
        key={"mycomment"}
        className={clsx(styles.tab, activeKey === "mycomment" && styles.active)}
        onClick={() => onChange("mycomment")}
      >
        <IconButton iconName={"Bubble"} fill={activeKey === "mycomment" ? "#f36438" : "#7f838c"} />

        <span>댓글</span>
      </button>
    </nav>
  );
}
