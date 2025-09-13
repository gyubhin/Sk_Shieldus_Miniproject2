import styles from "./EmptyView.module.scss";

type Props = {
  message: string;
  isEmpty?: boolean | null;
  title: string;
};

/**
 *@description 비어있는 목록일때 보여지는 화면 컴포넌트
 */
export function EmptyView({ title, message, isEmpty }: Props) {
  if (!isEmpty) return;

  return (
    <section className={styles.empty_post_wrapper}>
      <img src="/images/ImageEmpty.svg" alt="빈 항목" />
      <h3 className={styles.title}>{title ?? "아직 등록된 게시글이 없습니다."}</h3>
      <p className={styles.message}>{message ?? "첫 번째 게시글을 작성해보세요!"}</p>
    </section>
  );
}
