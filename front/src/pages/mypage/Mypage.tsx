import clsx from "clsx";
import styles from "./Mypage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { Header } from "@/shared/components/header/Header";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import { useState } from "react";
import type { MypageTabKey } from "@/features/users/_types/base";
import { MyProfileView } from "@/features/users/_components/mypage/MyProfileView";
import MyPostItem from "@/features/users/_components/mypage/MyPostItem";
import { MypageInnerTab } from "@/features/users/_components/mypage/MypageInnerTab";
import { MyCommentItem } from "@/features/users/_components/mypage/MyCommentItem";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 *@description 마이페이지
 */
function Mypage() {
  const [tab, setTab] = useState<MypageTabKey>("wish");
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  const navigate = useNavigate();

  const user = {
    avatarUrl: undefined,
    nickname: "토토",
    description: "잘 부탁드려요!~",
    postCount: 0,
    commentCount: 0,
  };

  const onMoveEditProfile = () => {
    navigate("/mypage/edit");
  };

  const onMoveSetting = () => {
    navigate("/mypage/setting");
  };

  // 페이지 이동 이벤트
  const onPageMove = (page: number) => {
    navigate(`/mypage?page=${page}`);
  };

  // const wishGroups = Array.from({ length: 5 });

  return (
    <CommonLayout>
      <Header />

      <MyProfileView
        avatarUrl={user.avatarUrl}
        nickname={user.nickname}
        description={user.description}
        postCount={user.postCount}
        commentCount={user.commentCount}
        onEditProfile={onMoveEditProfile}
        onEditLocation={() => alert("동네 수정 클릭됨")}
        onSettings={onMoveSetting}
      />

      <MypageInnerTab activeKey={tab} onChange={(_tab) => setTab(_tab)} />

      {tab === "wish" && (
        <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
          {/* {wishGroups.map((_, idx) => (
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
          ))} */}
        </section>
      )}

      {tab === "mypost" && (
        <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <MyPostItem key={idx} title="title" content="content" />
          ))}
        </section>
      )}

      {tab === "mycomment" && (
        <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <MyCommentItem key={idx} title="title" content="content" createdAt="250812" />
          ))}
        </section>
      )}

      <Pagination totalPages={7} currentPage={Number(page ?? 1)} onChange={onPageMove} />
    </CommonLayout>
  );
}

export default Mypage;
