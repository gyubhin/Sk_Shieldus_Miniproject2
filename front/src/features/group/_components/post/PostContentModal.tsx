import { CommentItem } from "@/features/comment/_components/CommentItem";
import styles from "./PostContentModal.module.scss";
import { IconButton } from "@/shared/components/icon/IconButton";
import { usePostDetailApi } from "@/features/post/_hooks/query";
import dayjs from "dayjs";
import {
  useDeleteCommentApi,
  usePostCommentApi,
  usePatchCommentApi,
} from "@/features/comment/_hooks/mutation";
import { useState } from "react";
import type { ErrorResponse } from "react-router-dom";
import { useUiStore } from "@/shared/stores/ui.store";
import ModalConfirm from "@/shared/components/modal/ModalConfirm";
import { isAxiosError } from "axios";
import { useGetCommentsApi } from "@/features/comment/_hooks/query";
import useLoading from "@/shared/hooks/useLoading";
import { getImageUrl } from "@/libs/image";

type Props = {
  groupId?: number;
  postId?: number;
  isOpen?: boolean;
  imageUrl: string;
  onClose: () => void;
};

/**
 *@description 게시글 상세 내용 + 댓글 모달
 */
export function PostContentModal({ groupId, postId, isOpen, imageUrl, onClose }: Props) {
  if (!isOpen || !groupId || !postId) return;

  const showToast = useUiStore((s) => s.showToast);

  const {
    data: postDetailData,
    refetch: refetchPostDetail,
    isLoading: isLoadingPost,
  } = usePostDetailApi(groupId, postId);

  const {
    data: commentsData,
    refetch: refetchComments,
    isLoading: isLoadingComments,
  } = useGetCommentsApi(groupId, postId);

  const { mutateAsync: createCommentMutate, isPending: isPendingCreate } = usePostCommentApi(
    groupId,
    postId,
  );
  const { mutateAsync: updateCommentMutate, isPending: isPendingUpdate } = usePatchCommentApi(
    groupId,
    postId,
  );
  const { mutateAsync: deleteCommentMutate, isPending: isPendingDelete } = useDeleteCommentApi(
    groupId,
    postId,
  );
  const [comment, setComment] = useState("");
  useLoading(
    isPendingCreate || isPendingUpdate || isPendingDelete || isLoadingPost || isLoadingComments,
  );

  const [isDeletePopupShow, setDeletePopupShow] = useState(false);
  const initSelectedId = { delete: null, recomment: null, edit: null };
  const [selectedId, setSelectedCommentId] = useState({
    recomment: null as null | number,
    delete: null as null | number,
    edit: null as null | number,
  });

  // 댓글 등록/수정/답글
  const onSubmitComment = async () => {
    if (isPendingCreate || isPendingUpdate || isPendingDelete) return;

    if (comment.length === 0) {
      showToast({ message: "댓글을 입력해주세요.", type: "error" });
      return;
    }

    if (comment.length > 200) {
      showToast({ message: "댓글은 최대 200자까지 입력가능합니다.", type: "error" });
      return;
    }

    try {
      if (selectedId.edit) {
        // ===== 댓글 수정 =====
        const res = await updateCommentMutate({
          commentId: selectedId.edit,
          body: { content: comment },
        });

        if (res.status === 200) {
          refetchComments();
          showToast({ message: "댓글이 수정되었습니다.", type: "success" });
          setSelectedCommentId(initSelectedId);
          setComment("");
        }
      } else {
        // ===== 댓글 등록 / 답글 등록 =====
        const res = await createCommentMutate({
          content: comment,
          parentId: selectedId.recomment ?? null, // ★ parentId 세팅
        });

        if (res.status === 201) {
          refetchComments();
          showToast({
            message: selectedId.recomment ? "답글이 등록되었습니다." : "댓글이 등록되었습니다.",
            type: "success",
          });
          setSelectedCommentId(initSelectedId);
          setComment("");
        }
      }
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        showToast({ message: error.message ?? "", type: "error" });
      }
    }
  };

  /**
   *@description 댓글 삭제 확정 이벤트
   */
  const onConfirmDeleteComment = (deletedId: number | null) => {
    if (deletedId === null) return;

    deleteCommentMutate(deletedId)
      .then((res) => {
        if (res.status === 200) {
          refetchPostDetail();

          showToast({
            message: "댓글이 삭제되었습니다.",
            type: "success",
          });

          setSelectedCommentId(initSelectedId);
        }
      })
      .catch((error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          showToast({
            message: error.message ?? "",
            type: "error",
          });
        }
      })
      .finally(() => {
        setDeletePopupShow(false);
      });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 왼쪽: 게시글 이미지 */}
        <div className={styles.image_wrapper}>
          <img src={getImageUrl(postDetailData?.imageUrl)} alt="post" className={styles.image} />
        </div>

        {/* 오른쪽: 본문 + 댓글 */}
        <div className={styles.right}>
          {/* 헤더 */}
          <div className={styles.header}>
            <div className={styles.author_view}>
              <div className={styles.profile_img} />

              <span className={styles.author}>{postDetailData?.authorNickname ?? ""}</span>
              <span>{dayjs(postDetailData?.createdAt).format("YYYY-MM-DD")}</span>
            </div>

            <IconButton size={24} onClick={onClose} iconName={"Close"} />
          </div>

          <div className={styles.main_wrapper}>
            {/* 본문 */}
            <div className={styles.content_wrapper}>
              <p className={styles.text}>
                <span className={styles.title}>{postDetailData?.title ?? ""}</span>
              </p>

              <p className={styles.text}>
                <span className={styles.content}>{postDetailData?.content ?? ""}</span>
              </p>
            </div>

            {/* 댓글 리스트 */}
            <div className={styles.comments_wrapper}>
              {(commentsData ?? []).map((_comment) => (
                <div className={styles.comments}>
                  <CommentItem
                    key={_comment.id}
                    data={_comment}
                    onReply={() => {
                      setSelectedCommentId({ ...initSelectedId, recomment: _comment.id }); // 답글 대상 지정
                      setComment(""); // 새 입력
                    }}
                    onDelete={() => {
                      setDeletePopupShow(true);
                      setSelectedCommentId({ ...initSelectedId, delete: _comment.id });
                    }}
                    onEdit={() => {
                      setSelectedCommentId({ ...initSelectedId, edit: _comment.id });
                      setComment(_comment.content);
                    }}
                  />

                  <div className={styles.recomments}>
                    {(_comment.children ?? []).map((reomment) => (
                      <CommentItem
                        key={reomment.id}
                        data={reomment}
                        onReply={() => {
                          setSelectedCommentId({ ...initSelectedId, recomment: reomment.id }); // 답글 대상 지정
                          setComment(""); // 새 입력
                        }}
                        onDelete={() => {
                          setDeletePopupShow(true);
                          setSelectedCommentId({ ...initSelectedId, delete: reomment.id });
                        }}
                        onEdit={() => {
                          setSelectedCommentId({ ...initSelectedId, edit: reomment.id });
                          setComment(reomment.content);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 댓글 입력 */}
          <div className={styles.comment_input}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                selectedId.recomment
                  ? "답글을 입력하세요..."
                  : selectedId.edit
                    ? "댓글을 수정하세요..."
                    : "댓글을 입력하세요..."
              }
              onKeyDown={(e) => e.key === "Enter" && onSubmitComment()}
            />

            <button onClick={onSubmitComment}>
              {selectedId.edit ? "수정" : selectedId.recomment ? "답글 등록" : "등록"}
            </button>
          </div>
        </div>
      </div>

      <ModalConfirm
        open={isDeletePopupShow}
        onConfirm={() => onConfirmDeleteComment(selectedId.delete)}
        onClose={() => setDeletePopupShow(false)}
      />
    </div>
  );
}
