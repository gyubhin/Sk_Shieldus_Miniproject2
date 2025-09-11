import FilterList from "@/features/group/_components/FilterList";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { SearchInput } from "@/shared/components/input/SearchInput";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MainPage.module.scss";
import { SmallButton } from "@/shared/components/button/SmallButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useGetGroupsListApi } from "@/features/group/_hooks/query";

/**
 *@description 메인 페이지 > 검색, 추천 그룹 표시, 내가 가입한 모임,
 */
function MainPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: grouopsListData } = useGetGroupsListApi({
    size: 9,
    page: 1,
  });

  const word = searchParams.get("word");

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

  // 더보기 클릭 이벤트
  const onClickMore = (_more: string) => {
    navigate(`/search?more=${_more}`);
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
      <SectionTitle
        title={"추천 모임 표시"}
        rightActionLabel="더보기"
        onActionClick={() => onClickMore("recommend")}
      />

      <section className={styles.group_view}>
        {grouopsListData?.content.slice(0, 3).map((_item, idx) => (
          <GroupSearchItem data={_item} key={idx} tags={["파이썬", "AI"]} isHeart />
        ))}
      </section>

      <SectionTitle
        title={"내가 찜한 모임"}
        rightActionLabel="더보기"
        onActionClick={() => onClickMore("recommend")}
      />

      <section className={styles.group_view}>
        {grouopsListData?.content.slice(0, 3).map((_item, idx) => (
          <GroupSearchItem data={_item} key={idx} tags={["파이썬", "AI"]} isHeart />
        ))}
      </section>
    </CommonLayout>
  );
}

export default MainPage;
