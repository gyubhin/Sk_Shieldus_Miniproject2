import styles from "./GroupTab.module.scss";
import clsx from "clsx";

type Tab = {
  key: string;
  name: string;
  icon?: React.ReactNode;
};

type Props = {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
};

/**
 *@description 탭 리스트 컴포넌트
 * @prop tabs 탭 목록 (key, label 포함)
 * @prop activeKey 현재 선택된 탭의 key
 * @prop onChange 탭 클릭 시 호출되는 콜백 (선택된 탭의 key 전달)
 * 
 * @example
 * const tabs = [
 *   { key: "home", label: "홈" },
 *   { key: "board", label: "게시판" },
 *   { key: "chat", label: "채팅" },
 * ];
 *
 * <GroupTab 
 *   tabs={tabs} 
 *   activeKey="home" 
 *   onChange={(key) => setActiveTab(key)} 
 * />

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
          {tab.name}
        </button>
      ))}
    </nav>
  );
}
