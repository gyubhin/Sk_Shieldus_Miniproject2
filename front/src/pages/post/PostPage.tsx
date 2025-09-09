// src/pages/post/PostPage.tsx
import { useState } from "react";
import ModalConfirm from "@/shared/components/modal/ModalConfirm";
import ActionSheet from "@/shared/components/actionsheet/ActionSheet";
import { useNavigate, useParams } from "react-router-dom";

export default function PostPage() {
  const { postId } = useParams();
  const nav = useNavigate();

  const [openSheet, setOpenSheet] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // TODO: 실제 삭제 API 호출
      await new Promise((r) => setTimeout(r, 600));
      nav("/posts"); // 목록 경로에 맞게 수정
    } catch (e) {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
      setOpenConfirm(false);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px" }}>
        <h1 style={{ fontSize: 18, fontWeight: 800 }}>
          게시글 상세 {postId ? `#${postId}` : ""}
        </h1>
        <button aria-label="옵션" onClick={() => setOpenSheet(true)}>⋯</button>
      </header>

      <main style={{ padding: "0 20px 40px" }}>
        <p>여기에 게시글 내용이 들어갑니다.</p>
      </main>


      <ActionSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}       // 바깥(딤) 클릭/ESC로 닫힘
        firstText="수정"
        secondText="삭제"
        destructive="second"                      // 삭제(두 번째) 강조
        onClickFirst={() => {                     // 수정
          setOpenSheet(false);
          nav(`/posts/${postId ?? "demo"}/edit`);
        }}
        onClickSecond={() => {                    // 삭제 → 확인 모달
          setOpenSheet(false);
          setOpenConfirm(true);
        }}
      />

      <ModalConfirm
        open={openConfirm}
        title="정말로 삭제하시겠습니까?"
        confirmText={isDeleting ? "삭제중..." : "삭제"}
        cancelText="취소"
        onClose={() => (!isDeleting ? setOpenConfirm(false) : null)}
        onConfirm={() => !isDeleting && handleDelete()}
      />
    </div>
  );
}
