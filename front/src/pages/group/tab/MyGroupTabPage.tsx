import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MyGroupTabPage.module.scss";
import EventItem from "@/features/group/_components/EventItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMyJoinedGroupsApi } from "@/features/group/_hooks/query";
import { useGetMyUpcomingEvents } from "@/features/event/_hooks/event/query";
import { EmptyView } from "@/shared/components/empty/EmptyView";

/**
 *@description 내 모임 탭 > 정모 일정, 내가 참여한 모임 목록 페이지
 */
function MyGroupTabPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // const { data: eventList } = useGetEventsListApi();
  const { data: myEventsData } = useGetMyUpcomingEvents();

  const { data: myJoinedGroups, refetch: refetchMyJoinedGroup } = useGetMyJoinedGroupsApi({
    page: Number(page),
    size: 9,
  });

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      <SectionTitle title={`다가오는 정모 일정 (${myEventsData?.length ?? 0})`} />

      <section className={styles.schedule_view}>
        {(myEventsData ?? []).map((event) => (
          <EventItem data={event} />
        ))}
      </section>

      <SectionTitle title={"참여중인 모임"} />

      <section className={styles.my_group_view}>
        {(myJoinedGroups ?? []).map((_item, idx) => (
          <GroupSearchItem data={_item} key={idx} refetch={refetchMyJoinedGroup} />
        ))}
      </section>

      <EmptyView
        isEmpty={!myJoinedGroups || myJoinedGroups.length === 0}
        title="아직 가입하신 모임이 없습니다."
        message="첫 번째 모임에 가입해보세요!"
      />

      {/* <Pagination
        totalPages={myJoinedGroups?.totalPages ?? 1}
        currentPage={Number(page ?? 1)}
        onChange={onPageMove}
      /> */}
    </CommonLayout>
  );
}

export default MyGroupTabPage;
