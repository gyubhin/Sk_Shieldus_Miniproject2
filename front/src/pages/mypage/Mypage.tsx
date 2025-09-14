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
import { useNavigate } from "react-router-dom";
import {
  useGetMyComments,
  useGetMyLikedGroups,
  useGetMyPosts,
  useGetUserInfo,
} from "@/features/users/_hooks/query";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { useQueryParams } from "@/shared/hooks/useQueryParameter";

/**
 *@description 마이페이지
 */
function Mypage() {
  const [tab, setTab] = useState<MypageTabKey>("wish");
  const query = useQueryParams();
  const page = query.get("page");

  const { data: myPostsData } = useGetMyPosts({
    page: Number(page) - 1,
    size: 8,
  });

  const { data: myCommentsData } = useGetMyComments({
    page: Number(page) - 1,
    size: 8,
  });

  const { data: myLikedGroupData, refetch: refetchMyLikedGroup } = useGetMyLikedGroups({
    page: Number(page) - 1,
    size: 8,
  });

  const { data: userData } = useGetUserInfo();

  console.log(userData);

  const navigate = useNavigate();

  // 유저 프로필 수정 페이지 이동 이벤트
  const onMoveEditProfile = () => {
    navigate("/mypage/edit");
  };

  // 셋팅 페이지 이동 이벤트
  const onMoveSetting = () => {
    navigate("/mypage/setting");
  };

  // 페이지 이동 이벤트
  const onPageMove = (_page: number) => {
    query.set("page", _page.toString());
  };

  const onChangeTab = (_tab: MypageTabKey) => {
    query.set("page", "1");
    setTab(_tab);
  };

  return (
    <CommonLayout>
      <Header />

      <MyProfileView
        userData={userData}
        onEditProfile={onMoveEditProfile}
        onSettings={onMoveSetting}
      />

      <MypageInnerTab activeKey={tab} onChange={onChangeTab} />

      {tab === "wish" && (
        <section>
          <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
            {(myLikedGroupData?.content ?? []).map((item, idx) => (
              <GroupSearchItem key={idx} data={item} refetch={refetchMyLikedGroup} />
            ))}
          </section>

          <Pagination
            totalPages={myLikedGroupData?.totalPages ?? 1}
            currentPage={Number(page ?? 1)}
            onChange={onPageMove}
          />
        </section>
      )}

      {tab === "mypost" && (
        <section>
          <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
            {(myPostsData?.content ?? []).map((item, idx) => (
              <MyPostItem key={idx} data={item} />
            ))}
          </section>

          <Pagination
            totalPages={myPostsData?.totalPages ?? 1}
            currentPage={Number(page ?? 1)}
            onChange={onPageMove}
          />
        </section>
      )}

      {tab === "mycomment" && (
        <section>
          <section className={clsx(styles.item_container, styles[`${tab}_container`])}>
            {(myCommentsData?.content ?? []).map((item, idx) => (
              <MyCommentItem key={idx} data={item} />
            ))}
          </section>

          <Pagination
            totalPages={myCommentsData?.totalPages ?? 1}
            currentPage={Number(page ?? 1)}
            onChange={onPageMove}
          />
        </section>
      )}
    </CommonLayout>
  );
}

export default Mypage;
