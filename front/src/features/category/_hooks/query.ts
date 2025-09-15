import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi, getCategoriesWithGroupsApi } from "../_apis/category.api";
import type { CategoryWithGroupQuery } from "../_types/query";

/**
 *@description 카테고리 조회 훅
 */
export function useGetCategoriesApi() {
  return useQuery({
    queryKey: [reactQueryKeys.categories.getCategories],
    queryFn: () => getCategoriesApi(),
    select: (data) => {
      const reData = data.data.map((item) => ({ value: item.id.toString(), label: item.name }));

      return [
        {
          label: "전체",
          value: "0",
        },
        ...reData,
      ];
    },
  });
}

/**
 *@description 카테고리 별 그룹 조회 훅
 */
export function useGetCategoriesWithGroupsApi(query: CategoryWithGroupQuery) {
  return useQuery({
    queryKey: [reactQueryKeys.categories.getCategoriesWithGroupsApi, query],
    queryFn: () => getCategoriesWithGroupsApi(query),
    select: (data) => {
      return data.data;
    },
  });
}
