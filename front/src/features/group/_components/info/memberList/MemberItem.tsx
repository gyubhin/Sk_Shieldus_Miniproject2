import styles from "./MemberItem.module.scss";

type Props = {
  name: string;
  description: string;
};

/**
 *@description 모임원 항목 컴포넌트 (정보, 프로필, 이름)
 */
function MemberItem({ name, description }: Props) {
  return (
    <div className={styles.member_wrapper}>
      <image />

      <div className={styles.member_info}>
        <p>{name}</p>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default MemberItem;
