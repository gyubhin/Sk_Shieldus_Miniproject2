import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MyGroupTabPage.module.scss";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import EventItem from "@/features/group/_components/EventItem";

/**
 *@description 내 모임 탭 > 정모 일정, 내가 참여한 모임 목록 페이지
 */
function MyGroupTabPage() {
  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      <SectionTitle title={"다가오는 정모 일정 4"} />

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

      <SectionTitle title={"참여중인 모임"} />

      <section className={styles.my_group_view}>
        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart
        />

        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart
        />

        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart
        />

        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart
        />

        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart
        />
      </section>

      <Pagination totalPages={7} currentPage={2} onChange={() => {}} />
    </CommonLayout>
  );
}

export default MyGroupTabPage;
