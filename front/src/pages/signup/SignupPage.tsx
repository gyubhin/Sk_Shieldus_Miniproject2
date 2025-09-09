import { ActiveButton } from "@/shared/components/button/ActiveButton";
import CheckField from "@/shared/components/check/CheckField";
import { InputField } from "@/shared/components/input/InputField";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import styles from "./SignupPage.module.scss";
import { AuthInnerLayout } from "@/features/auth/_components/layout/AuthInnerLayout";

/**
 *@description 회원가입 페이지
 */
function SignupPage() {
  return (
    <CommonLayout>
      <AuthInnerLayout>
        <section className={styles.form_wrapper}>
          <img className={styles.image} src={"/images/BigImageLogo.svg"} alt={"big_image_logo"} />

          <form action="">
            <InputField required label={"이메일"} name={"title"} placeholder="제목을 입력하세요." />

            <InputField
              required
              label={"닉네임"}
              name={"content"}
              placeholder="내용을 입력하세요."
            />

            <InputField required label={"지역"} name={"title"} placeholder="제목을 입력하세요." />

            <InputField
              required
              label={"비밀번호"}
              name={"content"}
              placeholder="내용을 입력하세요."
            />

            <InputField
              required
              label={"비밀번호 확인"}
              name={"content"}
              placeholder="내용을 입력하세요."
            />

            <CheckField isCheck={false} label="개인정보처리방침" />

            <ActiveButton buttonStyle="disabled" disabled>
              회원가입
            </ActiveButton>
          </form>
        </section>
      </AuthInnerLayout>
    </CommonLayout>
  );
}

export default SignupPage;
