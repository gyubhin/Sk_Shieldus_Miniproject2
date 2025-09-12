import styles from "./MemberList.module.scss";
import MemberItem from "./MemberItem";
import clsx from "clsx";
import type { GetGroupsMemberItem } from "@/features/group/_types/base";

type Props = {
  onKickMember?: (userId: number) => void;
  onDelegateGroup?: (userId: number) => void;
  groupMembers: GetGroupsMemberItem[];
};

/**
 *@description 모임원 목록
 */
function MemberList({ onKickMember, onDelegateGroup, groupMembers }: Props) {
  return (
    <section className={styles.member_list_container}>
      <div className={clsx(styles.manager_view, styles.members_wrapper)}>
        <p>운영진</p>

        <MemberItem name={"최진수"} description={"안녕~"} />
      </div>

      <div className={clsx(styles.members_view, styles.members_wrapper)}>
        <p>모임 멤버 103</p>

        <div className={styles.manager_list}>
          {groupMembers.map((member) => (
            <MemberItem
              key={member.userId}
              name={"최진수"}
              description={"안녕~"}
              onKick={onKickMember}
              onDelegate={onDelegateGroup}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MemberList;
