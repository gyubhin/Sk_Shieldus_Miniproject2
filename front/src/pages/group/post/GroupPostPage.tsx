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
import ActionSheet from "@/shared/components/actionsheet/ActionSheet";
import { useDeletePostApi } from "@/features/post/_hooks/mutation";

/**
 *@description 모임 게시글 목록 페이지
 */
function GroupPostPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [isMoreOpen, setMoreOpen] = useState(false);

  const { onChangeTab, activeKey } = useSetGroupTab();
  const [isContentModalOpen, setContentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>();

  const { data: postList, refetch } = useGetPostListApi(1, {
    page: 0,
    size: 9,
  });

  const { mutateAsync: deleteMutate } = useDeletePostApi(Number(groupId));

  // 게시글 삭제
  const onDeletePost = () => {
    deleteMutate(Number(selectedPostId))
      .then(() => {
        refetch();
      })
      .finally(() => {
        setMoreOpen(false);
        setSelectedPostId(undefined);
      });
  };

  // 게시글 더보기 오픈 이벤트
  const onMoreOpen = (postId: number) => {
    setSelectedPostId(postId);
    setMoreOpen(true);
  };

  // 게시글 등록/수정 페이지 이동
  const onMoveRegisterPage = (postId?: number) => {
    navigate(`/group/${groupId}/post/register${postId ? `/${postId}` : ""}`);
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

        <button onClick={() => onMoveRegisterPage()} className={styles.top_tab_more_btn}>
          글 작성
        </button>
      </section>

      {/* 게시글 목록 */}
      <section className={styles.posts_wrapper}>
        {(postList?.content ?? []).map((item) => (
          <PostItem
            onMoreOpen={onMoreOpen}
            key={item.id}
            data={item}
            onContentOpen={() => {
              setSelectedPostId(item.id);
              setContentModalOpen(true);
            }}
          />
        ))}
      </section>

      <ActionSheet
        open={isMoreOpen}
        onClose={() => setMoreOpen(false)}
        onClickFirst={() => onMoveRegisterPage(selectedPostId)}
        onClickSecond={onDeletePost}
        firstText="수정하기"
        secondText="삭제하기"
        destructive="second"
      />

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
