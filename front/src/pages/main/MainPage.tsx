import FilterList from "@/features/group/_components/FilterList";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Header } from "@/shared/components/header/Header";
import { SearchInput } from "@/shared/components/input/SearchInput";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./MainPage.module.scss";
import { SmallButton } from "@/shared/components/button/SmallButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useGetGroupsListApi } from "@/features/group/_hooks/query";
import { useGetMyLikedGroups } from "@/features/users/_hooks/query";
import _ from "lodash";
import { EmptyView } from "@/shared/components/empty/EmptyView";
import useLoading from "@/shared/hooks/useLoading";

/**
 *@description 메인 페이지 > 검색, 추천 그룹 표시, 내가 가입한 모임,
 */
function MainPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    data: groupsListData,
    refetch: refetchGroupsData,
    isLoading,
  } = useGetGroupsListApi({
    size: 9,
    page: 0,
    keyword: "",
  });

  useLoading(isLoading);

  const { data: myLikedGroups, refetch: refetchMyLikedGroup } = useGetMyLikedGroups({
    page: 0,
    size: 6,
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

  const onRefetchList = () => {
    refetchGroupsData();
    refetchMyLikedGroup();
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

      <SectionTitle title={"내가 찜한 모임"} />

      <section className={styles.group_view}>
        {(myLikedGroups?.content ?? []).map((_item) => (
          <GroupSearchItem data={_item} key={_item.id} refetch={onRefetchList} />
        ))}

        {
          <EmptyView
            isEmpty={!myLikedGroups?.content || _.isEmpty(myLikedGroups?.content)}
            message={"지금 찜해보세요!"}
            title={"아직 찜한 모임이 없습니다."}
          />
        }
      </section>

      {/* 그룹 리스트 뷰 */}
      <SectionTitle title={"추천 모임 표시"} />

      <section className={styles.group_view}>
        {(groupsListData?.content ?? []).map((_item) => (
          <GroupSearchItem data={_item} key={_item.id} refetch={onRefetchList} />
        ))}
      </section>
    </CommonLayout>
  );
}

export default MainPage;
