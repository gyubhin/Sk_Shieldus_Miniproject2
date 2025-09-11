import styles from "./GroupRegisterPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { usePostGroupsApi } from "@/features/group/_hooks/mutation";
import { useGetCategoriesApi } from "@/features/category/_hooks/query";
import { LabeledDropdown } from "@/shared/components/dropdown/LabeledDropdown";
import { regionOptions } from "@/shared/constants/options";
import Tag from "@/shared/components/tag/Tag";
import { useState } from "react";
import type { PostGroupsBody } from "@/features/group/_types/body";
import { useNavigate, type ErrorResponse } from "react-router-dom";
import { groupSchema } from "@/features/group/_schemas/group.schema";
import z from "zod";
import { isAxiosError } from "axios";
import { strUtils } from "@/libs/str";
import type { GroupRegisterFormError } from "@/features/group/_types/base";

/**
 *@description 모임 등록/수정 페이지
 */
function GroupRegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync } = usePostGroupsApi();
  const { data: categoryOptions } = useGetCategoriesApi();

  // 에러메세지 초기값
  const initError: GroupRegisterFormError = {
    name: undefined,
    description: undefined,
    region: undefined,
    maxMembers: undefined,
    categoryId: undefined,
  };

  const initForm: PostGroupsBody = {
    name: "",
    description: "",
    region: "",
    maxMembers: 0,
    categoryId: 0,
  };

  const [errorMessage, setErrorMesage] = useState(initError);

  const [form, setForm] = useState(initForm);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  // 태그 추가
  const onAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags((prev) => [...prev, tag]);
      setTag("");
    }
  };

  // 태그 삭제
  const onDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  // 폼 수정 이벤트
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "maxMembers" ? strUtils.toNumber(value) : value,
    }));
  };

  /**
   *@description 등록 이벤트
   */
  const onRegister = async () => {
    // form valid 검증 여부

    try {
      // 검증 실행
      const validated = groupSchema.parse({ ...form, tags });
      const res = await mutateAsync(validated);

      if (res.status === 201) {
        alert("성공했습니다.");
        navigate("/group", { replace: true });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error;

        const [message, path] = [zodError.issues[0].message, zodError.issues[0].path[0]];
        setErrorMesage({ ...initError, [path]: message });

        return;
      } else if (isAxiosError<ErrorResponse>(error)) {
        //
        const errData = error.response?.data;
        alert(errData);
      }
    }
  };

  return (
    <CommonLayout>
      <BackHeader title={"모임 등록"} />

      <section className={styles.form}>
        <Card title="기본 정보">
          <InputField
            label={"모임 이름"}
            required
            value={form.name}
            onChange={onChangeForm}
            name={"name"}
            placeholder="모임 이름을 입력하세요."
            errorMessage={errorMessage["name"]}
          />

          <InputField
            label={"모임 설명"}
            required
            value={form.description}
            onChange={onChangeForm}
            name={"description"}
            placeholder="모임에 대한 자세한 설명을 입력해주세요."
            errorMessage={errorMessage["description"]}
          />

          <LabeledDropdown
            label="카테고리"
            required
            placeholder="카테고리를 선택해주세요."
            options={categoryOptions ?? []}
            onChange={(val) => setForm((prev) => ({ ...prev, categoryId: Number(val) }))}
            errorMessage={errorMessage["categoryId"]}
          />
        </Card>

        <Card title="모임 조건">
          <LabeledDropdown
            label="모임 지역"
            required
            placeholder="지역을 선택해주세요."
            options={regionOptions ?? []}
            onChange={(val) => setForm((prev) => ({ ...prev, region: val }))}
            errorMessage={errorMessage["region"]}
          />

          <InputField
            label={"최대 인원"}
            required
            value={form.maxMembers}
            onChange={onChangeForm}
            name={"maxMembers"}
            placeholder="최대 참여 인원을 입력하세요."
            errorMessage={errorMessage["maxMembers"]}
          />
        </Card>

        <Card title="부가 정보">
          <InputField
            value={tag}
            label={"모임에 관련된 태그를 추가해주세요. (최대 5개)"}
            name={"tag"}
            placeholder="태그 입력 후, Enter"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={onAddTag}
          />

          <div className={styles.tags}>
            {tags.map((item, i) => (
              <Tag key={i} name={item} onDelete={() => onDeleteTag(i)} />
            ))}
          </div>

          <InputField
            label={"모임 이미지 업로드"}
            name={"image"}
            placeholder="이미지 업로드하기"
            type="file"
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton onClick={onRegister}>둥록</ActiveButton>

          <ActiveButton buttonStyle="disabled">취소</ActiveButton>
        </div>
      </section>
    </CommonLayout>
  );
}

export default GroupRegisterPage;
