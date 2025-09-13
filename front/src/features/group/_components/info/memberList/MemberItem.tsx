import styles from "./MemberItem.module.scss";

type Props = {
  name: string;
  description: string;
  onKick?: (userId: number) => void;
  onDelegate?: (userId: number) => void;
  userId: number;
};

/**
 *@description 모임원 항목 컴포넌트 (정보, 프로필, 이름)
 */
function MemberItem({ name, description, onKick, onDelegate, userId }: Props) {
  return (
    <div className={styles.member_wrapper}>
      <image />

      <div className={styles.member_info}>
        <p>{name}</p>

        <p>{description}</p>
      </div>

      <div className={styles.actions}>
        {onDelegate && (
          <button onClick={() => onDelegate(userId)} className={styles.delegate_button}>
            위임하기
          </button>
        )}

        {onKick && (
          <button onClick={() => onKick(userId)} className={styles.kick_button}>
            강퇴하기
          </button>
        )}
      </div>
    </div>
  );
}

export default MemberItem;
