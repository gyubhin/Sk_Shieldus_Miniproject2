import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./GroupInfoPage.module.scss";
import EventItem from "@/features/group/_components/EventItem";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import GroupBanner from "@/features/group/_components/info/banner/GroupBanner";
import GroupInfoContent from "@/features/group/_components/info/content/GroupInfoContent";
import MemberList from "@/features/group/_components/info/memberList/MemberList";
import { useNavigate } from "react-router-dom";
import useSetGroupTab from "@/features/group/_hooks/useSetGroupTab";
import { IconButton } from "@/shared/components/icon/IconButton";

/**
 *@description 내 모임 탭 > 모임 정보 페이지
 */
function GroupInfoPage() {
  const navigate = useNavigate();

  const { onChangeTab, activeKey } = useSetGroupTab();

  // 모임 일정 등록 페이지로  이동
  const onMoveRegisterEvent = () => {
    navigate("/group/event/register");
  };

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 그룹탭 */}
      <section className={styles.top_tab_view}>
        <GroupTab
          tabs={[
            { key: "info", name: "모임 정보" },
            { key: "post", name: "게시판" },
          ]}
          activeKey={activeKey}
          onChange={onChangeTab}
        />

        <button className={styles.top_tab_more_btn}>
          <IconButton iconName="More" />
        </button>
      </section>

      {/* 모임 배너 이미지 */}
      <GroupBanner url="aaa" />

      <GroupInfoContent />

      <SectionTitle
        title={"정모 일정 4"}
        rightActionLabel="+ 일정 생성"
        onActionClick={onMoveRegisterEvent}
      />

      <section className={styles.schedule_view}>
        <EventItem
          title="토요일 스터디 모임"
          time="내일 오전 11:00"
          location="당산역 커피점"
          imageUrl="https://placehold.co/100x100"
          onMoreClick={() => console.log("더보기 클릭")}
        />

        <EventItem
          title="토요일 스터디 모임"
          time="내일 오전 11:00"
          location="당산역 커피점"
          imageUrl="https://placehold.co/100x100"
          onMoreClick={() => console.log("더보기 클릭")}
        />

        <EventItem
          title="토요일 스터디 모임"
          time="내일 오전 11:00"
          location="당산역 커피점"
          imageUrl="https://placehold.co/100x100"
          onMoreClick={() => console.log("더보기 클릭")}
        />
      </section>

      <MemberList />
    </CommonLayout>
  );
}

export default GroupInfoPage;
