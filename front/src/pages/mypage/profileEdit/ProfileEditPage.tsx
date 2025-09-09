import styles from "./ProfileEditPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";

/**
 *@description 프로필 수정 페이지
 */
function ProfileEditPage() {
  return (
    <CommonLayout>
      <BackHeader title={"프로필 수정"} onBack={() => {}} />

      <form className={styles.form}>
        <section className={styles.profile_field}>
          <img src={"/images/ImageProfileDefault.svg"} />

          <div className={styles.profile_description}>
            <p>프로필 사진</p>
            <p>JPG, PNG 파일을 업로드할 수 있습니다.</p>
          </div>
        </section>

        <Card title="유저 정보">
          <InputField label={"이메일"} required name={"email"} placeholder="example.com" />

          <InputField label={"email"} required name={"nickname"} placeholder="ex. 쿠키" />

          <InputField
            label={"카테고리"}
            required
            name={"pasword"}
            placeholder="카테고리를 선택해주세요."
          />

          <InputField label={"비밀번호"} type="password" name={"pasword"} placeholder="비밀번호" />

          <InputField
            label={"비밀번호 확인"}
            name={"pasword_check"}
            type="password"
            placeholder="비밀번호 확인"
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton>프로필 수정</ActiveButton>

          <ActiveButton buttonStyle="disabled">취소</ActiveButton>
        </div>
      </form>
    </CommonLayout>
  );
}

export default ProfileEditPage;
