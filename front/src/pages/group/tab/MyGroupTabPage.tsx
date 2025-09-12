import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MyGroupTabPage.module.scss";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import EventItem from "@/features/group/_components/EventItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMyJoinedGroupsApi } from "@/features/group/_hooks/query";
import { useGetEventsListApi } from "@/features/event/_hooks/event/query";

/**
 *@description 내 모임 탭 > 정모 일정, 내가 참여한 모임 목록 페이지
 */
function MyGroupTabPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

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

      <SectionTitle title={"다가오는 정모 일정 4"} />

      <section className={styles.schedule_view}>
        {/* {(eventsList?.content ?? []).map((event) => (
          <EventItem data={event} onMoreClick={() => console.log("더보기 클릭")} />
        ))} */}
      </section>

      <SectionTitle title={"참여중인 모임"} />

      <section className={styles.my_group_view}>
        {myJoinedGroups?.content.map((_item, idx) => (
          <GroupSearchItem data={_item} key={idx} tags={["파이썬", "AI"]} />
        ))}
      </section>

      <Pagination
        totalPages={myJoinedGroups?.totalPages ?? 1}
        currentPage={Number(page ?? 1)}
        onChange={onPageMove}
      />
    </CommonLayout>
  );
}

export default MyGroupTabPage;
