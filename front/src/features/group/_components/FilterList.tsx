import styles from "./FilterList.module.scss";
import { FilterButton } from "@/shared/components/button/FilterButton";

type Props = {};
function FilterList({}: Props) {
  return (
    <section className={styles.filter_list}>
      <FilterButton label={"날짜"} />
      <FilterButton label={"최신순"} />
      <FilterButton label={"지역"} />
      <FilterButton label={"찜순"} />
      <FilterButton label={"카테고리"} />
    </section>
  );
}

export default FilterList;
