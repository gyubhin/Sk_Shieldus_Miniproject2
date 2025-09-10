import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { MenuItem } from "@/shared/components/menu/MenuItem";

/**
 *@description 설정 페이지
 */
function SettingPage() {
  return (
    <CommonLayout>
      <BackHeader title={"설정"} />

      <section>
        <MenuItem label={"공지사항"} />
        <MenuItem label={"버전정보 v3.1.24"} />
      </section>
    </CommonLayout>
  );
}

export default SettingPage;
