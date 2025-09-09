import styles from "./Card.module.scss";
import { type ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

/**
 *@description 카드 뷰 컴포넌트
 */
function Card({ children, title }: Props) {
  return (
    <section className={styles.card}>
      <h3>{title}</h3>

      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default Card;
