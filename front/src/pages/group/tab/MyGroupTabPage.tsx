import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MyGroupTabPage.module.scss";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import EventItem from "@/features/group/_components/EventItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMyJoinedGroupsApi } from "@/features/group/_hooks/query";
import { useGetEventsListApi, useGetMyUpcomingEvents } from "@/features/event/_hooks/event/query";
import { EmptyView } from "@/shared/components/empty/EmptyView";

/**
 *@description 내 모임 탭 > 정모 일정, 내가 참여한 모임 목록 페이지
 */
function MyGroupTabPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  // const { data: eventList } = useGetEventsListApi();
  const { data: myEventsData } = useGetMyUpcomingEvents();

  const { data: myJoinedGroups } = useGetMyJoinedGroupsApi({
    page: Number(page),
    size: 9,
  });

  // 페이지 이동 이벤트
  const onPageMove = (page: number) => {
    navigate(`/group?page=${page}`);
  };

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      <SectionTitle title={`다가오는 정모 일정 ${myEventsData?.length ?? 0}`} />

      <section className={styles.schedule_view}>
        {(myEventsData ?? []).map((event) => (
          <EventItem data={event} onMoreClick={() => console.log("더보기 클릭")} />
        ))}
      </section>

      <SectionTitle title={"참여중인 모임"} />

      <section className={styles.my_group_view}>
        {(myJoinedGroups ?? []).map((_item, idx) => (
          <GroupSearchItem data={_item} key={idx} tags={["파이썬", "AI"]} />
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
