import styles from "./GroupRegisterPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";

/**
 *@description 모임 등록/수정 페이지
 */
function GroupRegisterPage() {
  return (
    <CommonLayout>
      <BackHeader title={"모임 등록"} onBack={() => {}} />

      <form className={styles.form}>
        <Card title="기본 정보">
          <InputField
            label={"모임 이름"}
            required
            name={"name"}
            placeholder="모임 이름을 입력하세요."
          />

          <InputField
            label={"모임 설명"}
            required
            name={"description"}
            placeholder="모임에 대한 자세한 설명을 입력해주세요."
          />

          <InputField
            label={"카테고리"}
            required
            name={"category"}
            placeholder="카테고리를 선택해주세요."
          />
        </Card>

        <Card title="모임 조건">
          <InputField
            label={"모임 지역"}
            required
            name={"region"}
            placeholder="지역을 선택해주세요."
          />

          <InputField
            label={"최대 인원"}
            required
            name={"maxMember"}
            placeholder="최대 참여 인원을 선택해주세요."
          />

          <InputField
            label={"시작 날짜"}
            required
            name={"category"}
            placeholder="시작 날짜"
            type="date"
          />
        </Card>

        <Card title="부가 정보">
          <InputField
            label={"모임에 관련된 키워드를 추가해주세요. (최대 5개)"}
            name={"tag"}
            placeholder="태그 입력"
          />

          <InputField
            label={"모임 이미지 업로드"}
            name={"image"}
            placeholder="이미지 업로드하기"
            type="file"
          />

          <InputField
            label={"시작 날짜"}
            required
            name={"category"}
            placeholder="시작 날짜"
            type="date"
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton>둥록</ActiveButton>

          <ActiveButton buttonStyle="disabled">취소</ActiveButton>
        </div>
      </form>
    </CommonLayout>
  );
}

export default GroupRegisterPage;
