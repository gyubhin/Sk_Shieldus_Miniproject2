import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>자네 어쩌다 이런 곳까지 오게되었는가... </p>
      <p className={styles.message}> 🚀</p>

      <div className={styles.egg}>🥚</div>

      <Link to="/" className={styles.homeButton}>
        집으로 돌아가기
      </Link>
    </div>
  );
}
