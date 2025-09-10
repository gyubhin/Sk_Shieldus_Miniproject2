import styles from "./GroupPostPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { Header } from "@/shared/components/header/Header";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import { PostContentModal } from "@/features/group/_components/post/PostContentModal";
import useSetGroupTab from "@/features/group/_hooks/useSetGroupTab";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostListApi } from "@/features/post/_hooks/query";
import PostItem from "@/features/group/_components/post/PostItem";

/**
 *@description 모임 게시글 목록 페이지
 */
function GroupPostPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const { onChangeTab, activeKey } = useSetGroupTab();
  const [isContentModalOpen, setContentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>();

  const { data: postList } = useGetPostListApi(1, {
    page: 0,
    size: 9,
  });

  // 게시글 등록 페이지 이동
  const onMoveRegisterPage = () => {
    navigate(`/group/${groupId}/post/register`);
  };

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 그룹탭 */}
      <section className={styles.top_tab_view}>
        <GroupTab
          tabs={[
            { key: "info", name: "모임 정보" },
            { key: "post", name: "게시판" },
          ]}
          activeKey={activeKey}
          onChange={onChangeTab}
        />

        <button onClick={onMoveRegisterPage} className={styles.top_tab_more_btn}>
          글 작성
        </button>
      </section>

      {/* 게시글 목록 */}
      <section className={styles.posts_wrapper}>
        {(postList?.content ?? []).map((item) => (
          <PostItem
            key={item.id}
            data={item}
            onContentOpen={() => {
              setSelectedPostId(item.id);
              setContentModalOpen(true);
            }}
          />
        ))}
      </section>

      <PostContentModal
        groupId={Number(groupId)}
        postId={selectedPostId}
        imageUrl={"/images/ImagePostDummy.svg"}
        isOpen={isContentModalOpen}
        onClose={() => setContentModalOpen(false)}
      />
    </CommonLayout>
  );
}

export default GroupPostPage;
