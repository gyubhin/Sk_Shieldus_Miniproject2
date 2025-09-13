import clsx from "clsx";
import styles from "./EggPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";

export default function EggPage() {
  return (
    <CommonLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>🎉 축하합니다! 🎉</h1>
        <p className={styles.message}>이스터에그 페이지를 발견했어요 🥚🐇</p>
        <img src="/images/Egg.png" alt="Easter Egg" className={styles.image} />

        <div>
          <p className={styles.member}>김뀨빈</p>
          <p className={styles.member}>5지윤</p>
          <p className={styles.member}>겸</p>
          <p className={styles.member}>꽉병국</p>
          <p className={styles.member}>만기봉</p>
          <p className={styles.member}>윤쫑윤</p>
        </div>
      </div>
    </CommonLayout>
  );
}
