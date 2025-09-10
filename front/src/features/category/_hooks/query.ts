import { reactQueryKeys } from "@/shared/constants/reactQueryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../_apis/category.api";

/**
 *@description 카테고리 조회 훅
 */
export function useGetCategoriesApi() {
  return useQuery({
    queryKey: [reactQueryKeys.categories],
    queryFn: () => getCategoriesApi(),
    select: (data) => {
      const reData = data.data.map((item) => ({ value: item.id.toString(), label: item.name }));

      return reData;
    },
  });
}
