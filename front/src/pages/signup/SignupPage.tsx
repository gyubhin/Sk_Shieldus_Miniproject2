import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import CheckField from "@/shared/components/check/CheckField";
import { InputField } from "@/shared/components/input/InputField";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { AuthInnerLayout } from "@/features/auth/_components/layout/AuthInnerLayout";
import styles from "./SignupPage.module.scss";

/**
 *@description 회원가입 페이지
 */
function SignupPage() {
  const nav = useNavigate();

  // 상태 관리
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);

  const [emailErr, setEmailErr] = useState<string>();
  const [nickErr, setNickErr] = useState<string>();
  const [pwErr, setPwErr] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    /\S+@\S+\.\S+/.test(email) &&
    nickname.trim().length >= 2 &&
    pw.length >= 8 &&
    pw === pw2 &&
    agree;


  // 유효성 검사
  const validate = () => {
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const nickOk = nickname.trim().length >= 2;
    const pwOk = pw.length >= 8 && pw === pw2;

    setEmailErr(emailOk ? undefined : "이메일 형식이 맞지 않습니다.");
    setNickErr(nickOk ? undefined : "닉네임이 올바르지 않습니다.");
    setPwErr(
      pw.length < 8
        ? "비밀번호는 8자 이상이어야 합니다."
        : pw !== pw2
        ? "비밀번호가 일치하지 않습니다."
        : undefined
    );

    return emailOk && nickOk && pwOk && agree;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      // TODO: 회원가입 API 연결
      // await signup({ email, nickname, region, password: pw });
      nav("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommonLayout>
      <AuthInnerLayout>
        <section className={styles.form_wrapper}>
          {/* 브랜드 로고 */}
          <img
            className={styles.image}
            src={"/images/BigImageLogo.svg"}
            alt={"big_image_logo"}
          />

          {/* 회원가입 폼 */}
          <form onSubmit={onSubmit}>
            <InputField
              required
              label="이메일"
              name="email"
              placeholder="example.com"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              errorMessage={emailErr}
            />

            <InputField
              required
              label="닉네임"
              name="nickname"
              placeholder="ex. 쿠키"
              type="text"
              value={nickname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNickname(e.target.value)
              }
              errorMessage={nickErr}
            />

            <InputField
              required
              label="지역"
              name="region"
              placeholder="서울시"
              type="text"
              value={region}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRegion(e.target.value)
              }
            />

            <InputField
              required
              label="비밀번호"
              name="password"
              placeholder="비밀번호"
              type="password"
              value={pw}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPw(e.target.value)
              }
              errorMessage={pwErr}
            />

            <InputField
              required
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              value={pw2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPw2(e.target.value)
              }
              errorMessage={pwErr}
            />

            {/* 약관 동의 */}
            <CheckField
              isCheck={agree}
              label="개인정보처리방침"
              onChange={() => setAgree(!agree)}
            />

            <ActiveButton type="submit" disabled={isSubmitting || !isFormValid}>
             {isSubmitting ? "가입 중..." : "회원가입"}
            </ActiveButton>
          </form>
        </section>
      </AuthInnerLayout>
    </CommonLayout>
  );
}

export default SignupPage;
