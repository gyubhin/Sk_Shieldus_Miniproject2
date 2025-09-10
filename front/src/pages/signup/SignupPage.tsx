import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import CheckField from "@/shared/components/check/CheckField";
import { InputField } from "@/shared/components/input/InputField";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { AuthInnerLayout } from "@/features/auth/_components/layout/AuthInnerLayout";
import styles from "./SignupPage.module.scss";

function SignupPage() {
  const nav = useNavigate();

  // 입력 상태
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);

  // 필드별 에러
  const [emailErr, setEmailErr] = useState<string | undefined>(undefined);
  const [pwErr, setPwErr] = useState<string | undefined>(undefined);
  const [pw2Err, setPw2Err] = useState<string | undefined>(undefined);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 변경 시 해당 에러만 즉시 해제
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailErr) setEmailErr(undefined);
  };
  const onPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    if (pwErr) setPwErr(undefined);
    if (pw2Err) setPw2Err(undefined); // 비번 바꾸면 확인도 초기화
  };
  const onPw2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw2(e.target.value);
    if (pw2Err) setPw2Err(undefined);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 0) 이전 에러 초기화
    setEmailErr(undefined);
    setPwErr(undefined);
    setPw2Err(undefined);

    // 1) 모든 입력값 trim해서 검증(공백 이슈 방지)
    const emailTrim = email.trim().toLowerCase();
    const nickTrim = nickname.trim();
    const pwTrim = pw.trim();
    const pw2Trim = pw2.trim();

    // 가장 일반적인 이메일 정규식(너무 빡세지 않게)
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    let hasError = false;

    // 이메일 형식
    if (!EMAIL_RE.test(emailTrim)) {
      setEmailErr("이메일 형식이 맞지 않습니다.");
      hasError = true;
    }

    // (참고) 닉네임/지역 검증이 필요하면 여기서 추가

    // 비밀번호 길이
    if (pwTrim.length < 8) {
      setPwErr("비밀번호는 8자 이상이어야 합니다.");
      hasError = true;
    }

    // 비밀번호 일치
    if (pwTrim !== pw2Trim) {
      setPw2Err("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }

    // 개인정보처리방침 동의
    if (!agree) {
      // 별도 문구 노출 위치 원하면 styles.policy_row 아래에 표시 가능
      hasError = true;
    }

    if (hasError) return;

    try {
      setIsSubmitting(true);
      // TODO: 회원가입 API
      // await signup({ email: emailTrim, nickname: nickTrim, region, password: pwTrim });
      nav("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommonLayout>
      <AuthInnerLayout>
        <section className={styles.form_wrapper}>
          <img className={styles.image} src={"/images/BigImageLogo.svg"} alt={"big_image_logo"} />

          <form onSubmit={onSubmit}>
            {/* 1) 이메일 + 에러는 이메일 입력 아래 */}
            <InputField
              required
              label="이메일"
              name="email"
              placeholder="example@domain.com"
              type="email"
              value={email}
              onChange={onEmailChange}
              errorMessage={emailErr}
            />

            {/* 닉네임/지역 */}
            <InputField
              required
              label="닉네임"
              name="nickname"
              placeholder="ex. 쿠키"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <InputField
              required
              label="지역"
              name="region"
              placeholder="서울시"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />

            {/* 2) 비밀번호 + 에러는 비밀번호 입력 아래 */}
            <InputField
              required
              label="비밀번호"
              name="password"
              placeholder="비밀번호"
              type="password"
              value={pw}
              onChange={onPwChange}
              errorMessage={pwErr}
            />

            {/* 3) 비밀번호 확인 + 에러는 확인 입력 아래 */}
            <InputField
              required
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              value={pw2}
              onChange={onPw2Change}
              errorMessage={pw2Err}
            />

            {/* 개인정보 처리방침: 클릭 시 동의 토글 + 보기 이동 */}
            <div className={styles.policy_row}>
              <div onClick={() => setAgree((prev) => !prev)}>
                <CheckField isCheck={agree} label="개인정보처리방침" />
              </div>
              <button
                type="button"
                className={styles.policy_link}
                onClick={() => nav("/privacy")}
              >
                보기
              </button>
            </div>

            {/* 제출 중에만 비활성화(검증은 onSubmit에서 수행) */}
            <ActiveButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "가입 중..." : "회원가입"}
            </ActiveButton>
          </form>
        </section>
      </AuthInnerLayout>
    </CommonLayout>
  );
}

export default SignupPage;
