import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import styles from "./FilterList.module.scss";
import { categoryOptions, regionOptions, sortOptions } from "@/shared/constants/options";
import { useGetCategoriesApi } from "@/features/category/_hooks/query";

function FilterList() {
  const { data: categoriesData } = useGetCategoriesApi();

  return (
    <section className={styles.filter_list}>
      <Dropdown
        options={sortOptions}
        defaultValue={sortOptions[0]}
        onChange={(value) => console.log("선택된 값:", value)}
      />

      <Dropdown
        isWideStyle
        options={regionOptions}
        defaultValue={regionOptions[0]}
        onChange={(value) => console.log("선택된 값:", value)}
      />

      <Dropdown
        isWideStyle
        options={categoriesData ?? []}
        defaultValue={categoryOptions[0]}
        onChange={(value) => console.log("선택된 값:", value)}
      />
    </section>
  );
}

export default FilterList;
