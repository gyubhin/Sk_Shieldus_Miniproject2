import styles from "./GroupTab.module.scss";
import clsx from "clsx";

type Tab = {
  key: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
};

/**
 *@description 탭리스트 (그룹 페이지)
 */
export function GroupTab({ tabs, activeKey, onChange }: Props) {
  return (
    <nav className={styles.tab_container}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={clsx(styles.tab, activeKey === tab.key && styles.active)}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
