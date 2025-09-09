import { useState } from "react";
import ModalConfirm from "@/shared/components/modal/ModalConfirm";
import ActionSheet from "@/shared/components/actionsheet/ActionSheet";

export default function PostPage() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 24 }}>
      <h1>게시글 상세</h1>
      <button onClick={() => setOpenSheet(true)}>옵션 열기</button>

      <ActionSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onEdit={() => {
          setOpenSheet(false);
          alert("수정 페이지로 이동");
        }}
        onDelete={() => {
          setOpenSheet(false);
          setOpenConfirm(true);
        }}
      />

      <ModalConfirm
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => {
          alert("삭제 완료!");
          setOpenConfirm(false);
        }}
      />
    </div>
  );
}
