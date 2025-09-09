import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";

/**
 *@description 로그인 페이지
 */
function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailErr, setEmailErr] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // TODO: 로그인 API 호출
      nav("/"); // 성공시 이동
    } catch (err) {
      setEmailErr("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CommonLayout>
      <BackHeader title="로그인 페이지" onBack={() => nav(-1)} />

      <form
        onSubmit={onSubmit}
        style={{
          maxWidth: 520,
          margin: "32px auto",
          padding: "24px 16px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <img alt="HobbyHub" src="/vite.svg" width={72} height={72} />
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: "8px 0 0" }}>
            Hobby<br />Hub
          </h1>
        </div>

        <InputField
          label="아이디"
          name="email"
          placeholder="example.com"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          errorMessage={emailErr}
          successMessage={emailErr ? undefined : email ? "success" : undefined}
        />

        <InputField
          label="비밀번호"
          name="password"
          placeholder="********"
          type="password"
          value={pw}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPw(e.target.value)
          }
        />

        <ActiveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </ActiveButton>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            type="button"
            onClick={() => nav("/signup")}
            style={{
              background: "none",
              border: 0,
              color: "#111827",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            회원가입
          </button>
        </div>
      </form>
    </CommonLayout>
  );
}

export default LoginPage;
