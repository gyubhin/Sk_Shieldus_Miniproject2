import React, { useState } from "react";
import Toast from "@/shared/components/toast/Toast";

/**
 *@description ui 테스트용 페이지
 */
function TestPage() {
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
    </div>
  );
}

export default TestPage;
