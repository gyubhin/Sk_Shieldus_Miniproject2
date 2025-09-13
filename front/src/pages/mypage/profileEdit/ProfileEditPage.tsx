import { useState } from "react";
import styles from "./ProfileEditPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { isAxiosError } from "axios";
import { usePatchUser } from "@/features/users/_hooks/mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import { LabeledDropdown } from "@/shared/components/dropdown/LabeledDropdown";
import { regionOptions } from "@/shared/constants/options";
import { useGetUserInfo } from "@/features/users/_hooks/query";

/**
 *@description 프로필 수정 페이지
 */
function ProfileEditPage() {
  const { data: previewUserData, refetch } = useGetUserInfo();

  const [nickname, setNickname] = useState(previewUserData?.nickname ?? "");
  const [introduction, setIntroduction] = useState(previewUserData?.introduction ?? "");
  const [profileImage, setProfileImage] = useState(previewUserData?.profileImageUrl ?? "");
  const [region, setRegion] = useState(previewUserData?.region ?? "");

  // 유저 정보 수정 api
  const { mutateAsync: mutatePatch } = usePatchUser();
  const { showToast } = useUiStore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await mutatePatch({
        nickname,
        introduction,
        region: "",
      });

      refetch();
      showToast({ message: "회원정보 수정이 완료되었습니다.", type: "success" });
    } catch (error) {
      let message = null;

      if (isAxiosError(error)) {
        if (error.status === 400) {
          message = "회원 정보 수정 필드가 잘못되었습니다.";
        } else if (error.status === 403) {
          message = "접근 권한이 없습니다.";
        } else {
          message = "잘못된 접근입니다.";
        }
      }
      showToast({ message: message ?? "관리자에게 문의해주세요.", type: "error" });
    }
  };

  return (
    <CommonLayout>
      <BackHeader title={"프로필 수정"} />

      <form className={styles.form} onSubmit={onSubmit}>
        <section className={styles.profile_field}>
          <img src={profileImage || "/images/ImageProfileDefault.svg"} alt="프로필 이미지" />

          <div className={styles.profile_description}>
            <p>프로필 사진</p>
            <p>JPG, PNG 파일을 업로드할 수 있습니다.</p>
          </div>
        </section>

        <Card title="유저 정보">
          {/* 이메일은 수정 불가 → disabled */}
          <InputField label={"이메일"} required name={"email"} placeholder="example.com" disabled />

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

          <LabeledDropdown
            required
            label="지역"
            placeholder="지역을 선택해주세요"
            options={regionOptions}
            onChange={(val) => setRegion(val)}
            defaultValue={region}
          />

          <InputField
            label={"프로필 이미지 URL"}
            name={"profileImage"}
            placeholder="이미지 주소 입력"
            value={profileImage}
            type="file"
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton type="submit">프로필 수정</ActiveButton>
          <ActiveButton type="button" buttonStyle="disabled" onClick={() => window.history.back()}>
            취소
          </ActiveButton>
        </div>
      </form>
    </CommonLayout>
  );
}

export default ProfileEditPage;
