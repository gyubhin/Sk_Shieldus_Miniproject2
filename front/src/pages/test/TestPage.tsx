import React, { useState } from "react";
import Toast from "@/shared/components/toast/Toast";

/**
 *@description ui 테스트용 페이지
 */
function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 32,
      }}
    >
      <h2>Toast Test Page</h2>
      <button onClick={() => setOpen(true)}>토스트 띄우기</button>

      {open && (
        <Toast
          message="토스트 테스트"
          type="error"
          duration={3000}
          position="top-center"
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default TestPage;
