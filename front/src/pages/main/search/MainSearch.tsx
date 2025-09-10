import FilterList from "@/features/group/_components/FilterList";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { SearchInput } from "@/shared/components/input/SearchInput";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MainSearch.module.scss";
import { SmallButton } from "@/shared/components/button/SmallButton";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

/**
 *@description 메인 페이지 > 검색 내용 페이지 컴포넌트
 */
function MainSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const word = searchParams.get("word");
  const more = searchParams.get("more");
  const page = searchParams.get("page");

  const [search, setSearch] = useState(word);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 버튼 클릭 이벤트
  const onSearchMove = () => {
    navigate(`/search?word=${encodeURIComponent(search ?? "")}`);
  };

  // 검색어 입력 키다운 이벤트
  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchMove();
    }
  };

  // 페이지 이동 이벤트
  const onPageMove = (page: number) => {
    navigate(`/search?word=${encodeURIComponent(search ?? "")}&page=${page}`);
  };

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 검색 뷰 */}
      <section className={styles.search_view}>
        <SearchInput value={search ?? ""} onChange={onSearchChange} onKeyDown={onSearchKeyDown} />

        <SmallButton onClick={onSearchMove} styleType={"black"}>
          검색
        </SmallButton>
      </section>

      {/* 필터 뷰 */}
      <FilterList />

      {/* 그룹 리스트 뷰 */}
      {!more && search && <SectionTitle title={`'${word}'으로 검색한 내용`} />}

      <section className={styles.group_serach_view}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <GroupSearchItem
            key={idx}
            name="파이썬 프로그래밍"
            description="파이썬 기초부터 실무·AI까지..."
            region="강남구"
            maxMembers={6}
            currentMembers={3}
            createdAt="2025.02.04"
            imageUrl="https://placehold.co/600x400"
            tags={["파이썬", "AI"]}
            isHeart
          />
        ))}
      </section>

      <Pagination totalPages={7} currentPage={Number(page ?? 1)} onChange={onPageMove} />
    </CommonLayout>
  );
}

export default MainSearch;
