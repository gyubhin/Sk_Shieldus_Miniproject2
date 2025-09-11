import { IconButton } from "../icon/IconButton";
import styles from "./Pagination.module.scss";
import clsx from "clsx";

type Props = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
};

/**
 *@description 페이지 네이션 컴포넌트
 *@param totalPages 전체페이지 수
 *@param currentPage 현재페이지 수
 *@param onChange 페이징 클릭 이벤트
 */
export function Pagination({ totalPages, currentPage, onChange }: Props) {
  // 현재 페이지 리스트 리스트 가져옴
  const getPageRange = () => {
    if (totalPages <= 5) {
      // 전체 페이지가 5 미만 → 그냥 다 보여줌
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 현재 페이지 기준으로 앞뒤 2칸 (총 5개)
    let start = Math.max(currentPage - 2, 1);
    let end = start + 4;

    // 끝 페이지를 넘지 않도록 보정
    if (end > totalPages) {
      end = totalPages;
      start = end - 4;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageRange();

  return (
    <div className={styles.container}>
      <button onClick={() => onChange(1)}>
        <IconButton iconName={"Left"} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={clsx(styles.page_button, currentPage === page && styles.active)}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onChange(totalPages)}>
        <IconButton iconName={"Right"} />
      </button>
    </div>
  );
}
