import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { AuthInnerLayout } from "@/features/auth/_components/layout/AuthInnerLayout";
import styles from "./LoginPage.module.scss";
import { postLoginApi, useAccessTokenStore } from "@/features/auth";
import { useUiStore } from "@/shared/stores/ui.store";
import useLoading from "@/shared/hooks/useLoading";

/**
 *@description 로그인 페이지
 */
function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailErr, setEmailErr] = useState<string | undefined>(undefined);
  const [serverErr, setServerErr] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useUiStore();
  const { setToken } = useAccessTokenStore();

  useLoading(isSubmitting);

  const validate = () => {
    const ok = /\S+@\S+\.\S+/.test(email);
    setEmailErr(ok ? undefined : "이메일 형식이 맞지 않습니다.");
    return ok && pw.length > 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const res = await postLoginApi({ email, password: pw });

      if (res.data?.accessToken) {
        setToken(res.data.accessToken);
        showToast({ message: "로그인 성공!", type: "success" });
        nav("/"); // 성공 시 홈으로 이동
      } else {
        setEmailErr("로그인 실패: 토큰이 반환되지 않았습니다.");
      }
    } catch (err) {
      console.error(err);
      setServerErr("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommonLayout>
      <AuthInnerLayout>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.brand}>
            <img className={styles.image} src={"/images/BigImageLogo.svg"} alt={"big_image_logo"} />
          </div>

          <InputField
            label="아이디"
            name="email"
            placeholder="example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={emailErr}
          />

          <InputField
            label="비밀번호"
            name="password"
            placeholder="********"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            errorMessage={serverErr}
          />

          <ActiveButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </ActiveButton>

          <div className={styles.signupRow}>
            <button type="button" onClick={() => nav("/signup")} className={styles.signupBtn}>
              회원가입
            </button>
          </div>
        </form>
      </AuthInnerLayout>
    </CommonLayout>
  );
}

export default LoginPage;
