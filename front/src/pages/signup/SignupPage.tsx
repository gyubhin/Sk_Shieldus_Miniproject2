import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import CheckField from "@/shared/components/check/CheckField";
import { InputField } from "@/shared/components/input/InputField";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { AuthInnerLayout } from "@/features/auth/_components/layout/AuthInnerLayout";
import { LabeledDropdown } from "@/shared/components/dropdown/LabeledDropdown";
import { regionOptions } from "@/shared/constants/options";
import axios from "axios"; 
import styles from "./SignupPage.module.scss";

// 보이지 않는 문자/공백 정리
const sanitize = (v: string) =>
  v.normalize("NFC").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim();

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function SignupPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);

  const [emailErr, setEmailErr] = useState<string | undefined>(undefined);
  const [pwErr, setPwErr] = useState<string | undefined>(undefined);
  const [pw2Err, setPw2Err] = useState<string | undefined>(undefined);
  const [agreeErr, setAgreeErr] = useState<string | undefined>(undefined);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailErr(undefined);
    setPwErr(undefined);
    setPw2Err(undefined);
    setAgreeErr(undefined);

    const emailSan = sanitize(email).toLowerCase();
    const pwSan = sanitize(pw);
    const pw2San = sanitize(pw2);

    let hasError = false;

    if (!EMAIL_RE.test(emailSan)) {
      setEmailErr("이메일 형식이 맞지 않습니다.");
      hasError = true;
    }
    if (pwSan.length < 8) {
      setPwErr("비밀번호는 8자 이상이어야 합니다.");
      hasError = true;
    }
    if (pwSan !== pw2San) {
      setPw2Err("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }
    if (!agree) {
      setAgreeErr("개인정보처리방침에 동의해야 합니다.");
      hasError = true;
    }
    if (hasError) return;

    try {
      setIsSubmitting(true);

      
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/signup`,
        {
          email: emailSan,
          password: pwSan,
          nickname: sanitize(nickname),
          region: sanitize(region),
        }
      );

      console.log("회원가입 응답:", res.data);

      if (res.status === 201) {
        alert("회원가입이 완료되었습니다! 🎉");
        nav("/login"); // 가입 후 로그인 페이지로 이동
      } else {
        alert("회원가입 실패");
      }
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommonLayout>
      <AuthInnerLayout>
        <section className={styles.form_wrapper}>
          <img
            className={styles.image}
            src={"/images/BigImageLogo.svg"}
            alt={"big_image_logo"}
          />

          <form onSubmit={onSubmit} noValidate>
            <InputField
              required
              label="이메일"
              name="email"
              type="email"
              placeholder="example@domain.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={emailErr}
            />

            <InputField
              required
              label="닉네임"
              name="nickname"
              type="text"
              placeholder="ex. 쿠키"
              autoComplete="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
                        
            <LabeledDropdown
              required
              label="지역"
              placeholder="지역을 선택해주세요"
              options={regionOptions}
              onChange={(val) => setRegion(val)}
              errorMessage={agreeErr}
            />

            <InputField
              required
              label="비밀번호"
              name="password"
              type="password"
              placeholder="8자 이상 입력"
              autoComplete="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              errorMessage={pwErr}
            />

            <InputField
              required
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              autoComplete="new-password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              errorMessage={pw2Err}
            />

            <div>
              <div className={styles.policy_row}>
                <div onClick={() => setAgree((prev) => !prev)} style={{ cursor: "pointer" }}>
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
              {agreeErr && <p className={styles.form_error}>{agreeErr}</p>}
            </div>

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
