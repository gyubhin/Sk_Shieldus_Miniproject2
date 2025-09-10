import styles from "./GroupPostPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { Header } from "@/shared/components/header/Header";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import PostItem from "@/features/group/_components/post/PostItem";
import { PostContentModal } from "@/features/group/_components/post/PostContentModal";
import useSetGroupTab from "@/features/group/_hooks/useSetGroupTab";
import { useState } from "react";
import { IconButton } from "@/shared/components/icon/IconButton";

/**
 *@description 모임 게시글 목록 페이지
 */
function GroupPostPage() {
  const { onChangeTab, activeKey } = useSetGroupTab();
  const [isContentModalOpen, setContentModalOpen] = useState(false);

  const dummyComments = Array.from({ length: 15 }, (_, i) => ({
    id: String(i + 1),
    author: "tester1",
    content: "testcontent1",
    createdAt: "2025.05.01",
  }));

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

        <button className={styles.top_tab_more_btn}>
          <IconButton iconName="More" />
        </button>
      </section>

      {/* 게시글 목록 */}
      <section className={styles.posts_wrapper}>
        <PostItem onContentOpen={() => setContentModalOpen(true)} />
        <PostItem onContentOpen={() => setContentModalOpen(true)} />
      </section>

      <PostContentModal
        imageUrl={"/images/ImagePostDummy.svg"}
        author={"tester"}
        content={"testst"}
        createdAt={"20250501"}
        title="title"
        comments={dummyComments}
        isOpen={isContentModalOpen}
        onClose={() => setContentModalOpen(false)}
      />
    </CommonLayout>
  );
}

export default GroupPostPage;
