import styles from "./MemberList.module.scss";
import MemberItem from "./MemberItem";
import clsx from "clsx";
import type { GroupMembers } from "@/features/group/_types/base";

type Props = {
  onKickMember?: (userId: number) => void;
  onDelegateGroup?: (userId: number) => void;
  groupMembers: GroupMembers;
};

/**
 *@description 모임원 목록
 */
function MemberList({ onKickMember, onDelegateGroup, groupMembers }: Props) {
  const { admin, members } = groupMembers;
  return (
    <section className={styles.member_list_container}>
      <div className={clsx(styles.manager_view, styles.members_wrapper)}>
        <p>운영진</p>

        <MemberItem
          userId={admin?.userId}
          name={admin?.nickname ?? ""}
          description={"잘 부탁드립니다."}
        />
      </div>

      <div className={clsx(styles.members_view, styles.members_wrapper)}>
        <p>모임 멤버 {members?.length ?? 0}</p>

        <div className={styles.manager_list}>
          {members.map((member) => (
            <MemberItem
              key={member.userId}
              userId={member.userId}
              name={member?.nickname ?? ""}
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
