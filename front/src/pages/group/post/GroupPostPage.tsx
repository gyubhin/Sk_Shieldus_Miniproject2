import styles from "./GroupPostPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { Header } from "@/shared/components/header/Header";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import PostItem from "@/features/group/_components/post/PostItem";
import { PostContentModal } from "@/features/group/_components/post/PostContentModal";

/**
 *@description 모임 게시글 페이지
 */
function GroupPostPage() {
  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 그룹탭 */}
      <section className={styles.top_tab_view}>
        <GroupTab
          tabs={[
            { key: "home", name: "홈" },
            { key: "board", name: "게시판" },
          ]}
          activeKey={"home"}
          onChange={() => {}}
        />
      </section>

      {/* 게시글 목록 */}
      <section className={styles.posts_wrapper}>
        <PostItem />
        <PostItem />
      </section>

      <PostContentModal
        imageUrl={"/images/ImagePostDummy.svg"}
        author={"tester"}
        content={"testst"}
        createdAt={"20250501"}
        title="title"
        comments={[
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
          {
            id: "1",
            author: "teser1",
            content: "testcontent1",
            createdAt: "2025.05.01",
          },
        ]}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </CommonLayout>
  );
}

export default GroupPostPage;
