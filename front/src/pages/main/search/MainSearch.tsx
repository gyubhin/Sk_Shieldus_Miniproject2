import FilterList from "@/features/group/_components/FilterList";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { SearchInput } from "@/shared/components/input/SearchInput";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MainSearch.module.scss";
import { SmallButton } from "@/shared/components/button/SmallButton";
import { Pagination } from "@/shared/components/pagenation/Pagenation";

/**
 *@description 메인 페이지 > 검색 내용 페이지 컴포넌트
 */
function MainSearch() {
  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 검색 뷰 */}
      <section className={styles.search_view}>
        <SearchInput />

        <SmallButton styleType={"black"}>검색</SmallButton>
      </section>

      {/* 필터 뷰 */}
      <FilterList />

      {/* 그룹 리스트 뷰 */}
      <SectionTitle title={"'파이썬'으로 검색한 내용"} />

      <section className={styles.group_serach_view}>
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

export default MainSearch;
