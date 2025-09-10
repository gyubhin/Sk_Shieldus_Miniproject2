import styles from "./PostRegisterPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";

/**
 *@description 게시글 등록/수정 페이지
 */
function PostRegisterPage() {
  return (
    <CommonLayout>
      <BackHeader title={"모임 등록"} />

      <form className={styles.form}>
        <Card title="게시글 정보">
          <InputField required label={"제목"} name={"title"} placeholder="제목을 입력하세요." />
          <InputField required label={"내용"} name={"content"} placeholder="내용을 입력하세요." />

          <InputField
            label={"이미지 업로드"}
            name={"image"}
            placeholder="이미지 업로드하기"
            type="file"
          />
        </Card>

        <div className={styles.buttons}>
          <ActiveButton>등록</ActiveButton>
          <ActiveButton buttonStyle="disabled">취소</ActiveButton>
        </div>
      </form>
    </CommonLayout>
  );
}

export default PostRegisterPage;
