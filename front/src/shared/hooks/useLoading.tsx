import { useEffect } from "react";
import { useUiStore } from "../stores/ui.store";

/**
 *@description loading 훅
 */
function useLoading(isLoading?: boolean) {
  const { showLoading, hideLoading } = useUiStore();

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  return;
}

export default useLoading;
