import clsx from "clsx";
import styles from "./Mypage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { Header } from "@/shared/components/header/Header";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import { useState } from "react";
import type { MypageTabKey } from "@/features/users/_types/base";
import { MyProfileView } from "@/features/users/_components/mypage/MyProfileView";
import MyPostItem from "@/features/users/_components/mypage/MyPostItem";
import { MypageInnerTab } from "@/features/users/_components/mypage/MypageInnerTab";
import { MyCommentItem } from "@/features/users/_components/mypage/MyCommentItem";

/**
 *@description 마이페이지
 */
function Mypage() {
  const [tab, setTab] = useState<MypageTabKey>("wish");

  const user = {
    avatarUrl: undefined,
    nickname: "토토",
    description: "잘 부탁드려요!~",
    postCount: 0,
    commentCount: 0,
  };

  return (
    <CommonLayout>
      <Header />

      <MyProfileView
        avatarUrl={user.avatarUrl}
        nickname={user.nickname}
        description={user.description}
        postCount={user.postCount}
        commentCount={user.commentCount}
        onEditProfile={() => alert("프로필 수정 클릭됨")}
        onEditLocation={() => alert("동네 수정 클릭됨")}
        onSettings={() => alert("설정 클릭됨")}
      />

      <MypageInnerTab activeKey={tab} onChange={(_tab) => setTab(_tab)} />

      {tab === "wish" && (
        <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
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
      )}

      {tab === "mypost" && (
        <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
          <MyPostItem title={"title"} content={"content"} />
          <MyPostItem title={"title"} content={"content"} />
          <MyPostItem title={"title"} content={"content"} />
          <MyPostItem title={"title"} content={"content"} />
          <MyPostItem title={"title"} content={"content"} />
          <MyPostItem title={"title"} content={"content"} />
        </section>
      )}

      {tab === "mycomment" && (
        <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
          <MyCommentItem title={"title"} content={"content"} createdAt={"250812"} />
        </section>
      )}

      <Pagination totalPages={7} currentPage={2} onChange={() => {}} />
    </CommonLayout>
  );
}

export default Mypage;
