import { useNavigate } from "react-router-dom";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { AuthInnerLayout } from "@/features/auth/_components/layout/AuthInnerLayout";
import styles from "./PrivacyPage.module.scss";

/**
 * @description 개인정보처리방침 페이지
 */
function PrivacyPage() {
  const nav = useNavigate();

  return (
    <CommonLayout>
      <BackHeader title="개인정보처리방침" onBack={() => nav(-1)} />

      <AuthInnerLayout>
        <div className={styles.container}>
          <div className={styles.brand}>
            <img
              alt="HobbyHub"
              src="/images/BigImageLogo.svg"
              className={styles.brand__img}
            />
          </div>

          <section className={styles.card}>
            <article className={styles.article}>
              {/* TODO: 실제 개인정보처리방침 전문으로 교체 */}
              <h2>Hobby Hub 개인정보 처리방침</h2>
              <p>
                Hobby Hub(이하 “회사”)는 「개인정보 보호법」 등 관련 법령을 준수하며,
                이용자의 개인정보를 안전하게 보호하기 위해 최선을 다합니다.
                본 방침은 개인정보의 수집·이용·보관·파기에 관한 사항을 명확히 합니다.
              </p>
              <ol>
                <li>수집하는 개인정보 항목 및 수집 방법</li>
                <li>개인정보의 처리 목적</li>
                <li>보유 및 이용 기간</li>
                <li>제3자 제공 및 처리 위탁</li>
                <li>이용자와 법정대리인의 권리 및 행사 방법</li>
                <li>개인정보의 안전성 확보조치</li>
                <li>개인정보 보호책임자 및 연락처</li>
              </ol>
              <p>
                회사는 관련 법령의 변경 또는 서비스 정책의 변경에 따라 본 방침을
                개정할 수 있으며, 개정 시 웹사이트 공지사항 등을 통해 안내합니다.
              </p>
            </article>
          </section>

          <div className={styles.actions}>
            <ActiveButton onClick={() => nav(-1)}>확인</ActiveButton>
          </div>
        </div>
      </AuthInnerLayout>
    </CommonLayout>
  );
}

export default PrivacyPage;
