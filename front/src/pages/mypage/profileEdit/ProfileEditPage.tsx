import { useState } from "react";
import styles from "./ProfileEditPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";
import axios from "axios";

/**
 *@description 프로필 수정 페이지
 */
function ProfileEditPage() {
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("API URL:", import.meta.env.VITE_APP_API_URL);
      
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/users/me`,
        {
          nickname,
          introduction,
          profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // zustand store 연결도 가능
          },
        }
      );

      console.log("회원 정보 수정 응답:", res.data);
      alert("회원 정보가 수정되었습니다!");
    } catch (err) {
      console.error(err);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <CommonLayout>
      <BackHeader title={"프로필 수정"} />

      <form className={styles.form} onSubmit={onSubmit}>
        <section className={styles.profile_field}>
          <img
            src={profileImage || "/images/ImageProfileDefault.svg"}
            alt="프로필 이미지"
          />

          <div className={styles.profile_description}>
            <p>프로필 사진</p>
            <p>JPG, PNG 파일을 업로드할 수 있습니다.</p>
          </div>
        </section>

        <Card title="유저 정보">
          {/* 이메일은 수정 불가 → disabled */}
          <InputField
            label={"이메일"}
            required
            name={"email"}
            placeholder="example.com"
            disabled
          />

          <InputField
            label={"닉네임"}
            required
            name={"nickname"}
            placeholder="ex. 쿠키"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <InputField
            label={"소개글"}
            name={"introduction"}
            placeholder="자기소개를 입력해주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />

          <InputField
            label={"프로필 이미지 URL"}
            name={"profileImage"}
            placeholder="이미지 주소 입력"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton type="submit">프로필 수정</ActiveButton>
          <ActiveButton
            type="button"
            buttonStyle="disabled"
            onClick={() => window.history.back()}
          >
            취소
          </ActiveButton>
        </div>
      </form>
    </CommonLayout>
  );
}

export default ProfileEditPage;
