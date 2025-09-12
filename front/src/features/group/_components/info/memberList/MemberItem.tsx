import styles from "./MemberItem.module.scss";

type Props = {
  name: string;
  description: string;
  onKick?: (userId: number) => void;
  onDelegate?: (userId: number) => void;
};

/**
 *@description 모임원 항목 컴포넌트 (정보, 프로필, 이름)
 */
function MemberItem({ name, description, onKick, onDelegate }: Props) {
  return (
    <div className={styles.member_wrapper}>
      <image />

      <div className={styles.member_info}>
        <p>{name}</p>

        <p>{description}</p>
      </div>

      {onDelegate && (
        <button onClick={() => onDelegate(999)} className={styles.delegate_button}>
          위임하기
        </button>
      )}

      {onKick && (
        <button onClick={() => onKick(999)} className={styles.kick_button}>
          강퇴하기
        </button>
      )}
    </div>
  );
}

export default MemberItem;
