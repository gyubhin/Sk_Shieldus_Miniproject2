import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import styles from "./FilterList.module.scss";
import { regionOptions } from "@/shared/constants/options";
import { useGetCategoriesApi } from "@/features/category/_hooks/query";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryParams } from "@/shared/hooks/useQueryParameter";

/**
 *@description 검색 필터들
 */
function FilterList() {
  const { data: categoriesData } = useGetCategoriesApi();
  const query = useQueryParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryObj = query.toObject();

  const { region, cate } = queryObj;

  const regionDefault = region
    ? regionOptions.find((item) => item.value === region)
    : regionOptions[0];

  const cateDefault =
    categoriesData && cate
      ? categoriesData.find((item) => item.value === cate)
      : {
          label: "전체",
          value: "0",
        };

  // 필터 버튼 클릭 이벤트
  const onSearchMove = (key: string, value: string) => {
    if (location.pathname === "/") {
      navigate(`/search?${key}=${value}`);
    } else {
      query.set(key, value);
    }
  };

  return (
    <section className={styles.filter_list}>
      <Dropdown
        isWideStyle
        options={regionOptions}
        defaultValue={regionDefault}
        onChange={(opt) => onSearchMove("region", opt.value)}
      />

      <Dropdown
        isWideStyle
        options={categoriesData ?? []}
        defaultValue={cateDefault}
        onChange={(opt) => onSearchMove("cate", opt.value)}
      />
    </section>
  );
}

export default FilterList;
