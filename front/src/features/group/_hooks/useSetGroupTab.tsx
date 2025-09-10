import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 *@description 그룹 페이지 탭 설정 훅
 */
function useSetGroupTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams<{ id: string }>();
  const [activeKey, setActiveKey] = useState("info");

  const onChangeTab = (_key: string) => {
    navigate(`/group/${params.id}/${_key}`);
  };

  useEffect(() => {
    if (pathname.indexOf("/info") !== -1) {
      //info 탭
      setActiveKey("info");
    } else {
      //post 탭
      setActiveKey("post");
    }
  }, [pathname]);
  return {
    onChangeTab,
    activeKey,
    setActiveKey,
  };
}

export default useSetGroupTab;
