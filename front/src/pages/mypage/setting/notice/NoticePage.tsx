import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { MenuItem } from "@/shared/components/menu/MenuItem";

/**
 *@description 공지사항 페이지
 */
function NoticePage() {
  return (
    <CommonLayout>
      <BackHeader title={"공지사항"} />

      <section>
        <MenuItem label={"공지사항1"} right="250513" />

        <MenuItem label={"공지사항2"} right="250513" />
      </section>
    </CommonLayout>
  );
}

export default NoticePage;
