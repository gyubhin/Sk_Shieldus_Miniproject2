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
import { useGetGroupsListApi } from "@/features/group/_hooks/query";

/**
 *@description 메인 페이지 > 검색 내용 페이지 컴포넌트
 */
function MainSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const word = searchParams.get("word"); // 쿼리 파라미터 : 검색 단어
  const more = searchParams.get("more"); // 쿼리파라미터 : 더보기로 접근시
  const page = searchParams.get("page");

  const [search, setSearch] = useState(word);

  const { data: grouopsListData } = useGetGroupsListApi({
    size: 9,
    page: Number(page),
    search: word,
  });

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
        {grouopsListData?.content.map((_item, idx) => (
          <GroupSearchItem data={_item} key={idx} tags={["파이썬", "AI"]} isHeart />
        ))}
      </section>

      <Pagination
        totalPages={grouopsListData?.totalPages ?? 1}
        currentPage={Number(page ?? 1)}
        onChange={onPageMove}
      />
    </CommonLayout>
  );
}

export default MainSearch;
