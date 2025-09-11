import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 *@description 그룹 페이지 탭 설정 훅
 */
function useSetGroupTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams<{ groupId: string }>();
  const [activeKey, setActiveKey] = useState("info");

  const onChangeTab = (_key: string) => {
    navigate(`/group/${params.groupId}/${_key}`);
  };

  useEffect(() => {
    if (pathname.indexOf("/info") !== -1) {
      //info 탭
      setActiveKey("info");
    } else if (pathname.indexOf("/post") !== -1) {
      //post 탭
      setActiveKey("post");
    } else {
      setActiveKey("setting");
    }
  }, [pathname]);
  return {
    onChangeTab,
    activeKey,
    setActiveKey,
  };
}

export default useSetGroupTab;
