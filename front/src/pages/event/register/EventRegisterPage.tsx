import styles from "./EventRegisterPage.module.scss";
import { BackHeader } from "@/shared/components/header/BackHeader";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";

/**
 *@description 일정 등록/수정 페이지
 */
function EventRegisterPage() {
  return (
    <CommonLayout>
      <BackHeader title={"일정 등록"} onBack={() => {}} />

      <form className={styles.form}>
        <Card title="일정 정보">
          <InputField label={"제목"} required name={"title"} placeholder="제목을 입력하세요." />

          <InputField
            label={"내용"}
            required
            name={"description"}
            placeholder="일정에 대한 자세한 설명을 입력해주세요."
          />

          <InputField
            label={"날짜"}
            required
            name={"date"}
            type="date"
            placeholder="날짜를 정해주세요."
          />

          <InputField
            label={"일정 장소"}
            required
            name={"place"}
            type="place"
            placeholder="장소를 입력하세요."
          />

          <InputField
            label={"최대 인원 수"}
            required
            name={"maxPerson"}
            type="number"
            placeholder="최대 인원 수를 입력하세요."
          />

          <InputField
            label={"이미지 업로드"}
            name={"image"}
            type="file"
            placeholder="이미지 업로드하기"
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton>등록</ActiveButton>

          <ActiveButton buttonStyle="disabled">취소</ActiveButton>
        </div>
      </form>
    </CommonLayout>
  );
}

export default EventRegisterPage;
