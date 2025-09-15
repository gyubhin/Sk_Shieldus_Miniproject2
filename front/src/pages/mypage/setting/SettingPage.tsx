import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { MenuItem } from "@/shared/components/menu/MenuItem";
import { useNavigate } from "react-router-dom";

/**
 *@description 설정 페이지
 */
function SettingPage() {
  const navigate = useNavigate();
  return (
    <CommonLayout>
      <BackHeader title={"설정"} />

      <section>
        <MenuItem label={"공지사항"} onClick={() => navigate("/mypage/setting/notice")} />
      </section>
    </CommonLayout>
  );
}

export default SettingPage;
