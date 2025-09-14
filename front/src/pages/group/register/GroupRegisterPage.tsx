import styles from "./GroupRegisterPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { usePatchGroupsApi, usePostGroupsApi } from "@/features/group/_hooks/mutation";
import { useGetCategoriesApi } from "@/features/category/_hooks/query";
import { LabeledDropdown } from "@/shared/components/dropdown/LabeledDropdown";
import { regionOptions } from "@/shared/constants/options";
import Tag from "@/shared/components/tag/Tag";
import { useEffect, useState } from "react";
import type { PostGroupsForm } from "@/features/group/_types/body";
import { useNavigate, useParams, type ErrorResponse } from "react-router-dom";
import { groupSchema } from "@/features/group/_schemas/group.schema";
import z from "zod";
import { isAxiosError } from "axios";
import { strUtils } from "@/libs/str";
import type { GroupRegisterFormError } from "@/features/group/_types/base";
import { useGetGroupsOneApi } from "@/features/group/_hooks/query";
import { useUploadImage } from "@/features/image/_hooks/useUploadImage";

/**
 *@description 모임 등록/수정 페이지
 */
function GroupRegisterPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();

  // 그룹 등록
  const { mutateAsync: mutatePostGroups, isPending } = usePostGroupsApi();

  // 카테고리 조회
  const { data: categoryOptions } = useGetCategoriesApi();

  // 그룹 상세 조회
  const { data: groupsOneData } = useGetGroupsOneApi(groupId);

  // 이미지 업로드

  const { mutateAsync: mutatePatchGroups } = usePatchGroupsApi(groupId);

  // 에러메세지 초기값
  const initError: GroupRegisterFormError = {
    name: undefined,
    description: undefined,
    region: undefined,
    maxMembers: undefined,
    categoryId: undefined,
  };

  const initForm: PostGroupsForm = {
    name: "",
    description: "",
    region: "",
    maxMembers: 0,
    categoryId: undefined,
    imageUrl: null,
    tags: "",
  };

  const [errorMessage, setErrorMesage] = useState(initError);

  const [form, setForm] = useState(initForm);

  // 이미지 업로드 훅
  const { onUploadImage, showToast } = useUploadImage({
    onSuccess: (_imageUrl) => {
      setForm((prev) => ({
        ...prev,
        imageUrl: _imageUrl,
      }));
    },
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  // 태그 추가
  const onAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim()) {
      e.preventDefault();
      if (tags.length >= 5) {
        return showToast({ message: "태그는 최대 5개까지 가능합니다.", type: "error" });
      }
      if (tags.includes(tag.trim())) return;

      setTags((prev) => [...prev, tag.trim()]);
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
   *@description 등록/수정 이벤트
   */
  const onRegister = async () => {
    if (isPending) return;

    try {
      // 1. tags 배열 → 문자열로 합치기 (예: 콤마 구분)
      const tagsString = tags.join(",");

      // 2. 검증 실행
      const validated = groupSchema.parse({ ...form, tags: tagsString });

      // 3. API 호출 (등록 vs 수정)
      let res;
      if (groupId) {
        res = await mutatePatchGroups(validated); // 수정
      } else {
        res = await mutatePostGroups(validated); // 신규 등록
      }

      if (res.status === 200 || res.status === 201) {
        showToast({
          message: groupId ? "모임이 수정되었습니다." : "모임이 등록되었습니다.",
          type: "success",
        });
        navigate("/group", { replace: true });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const [message, path] = [error.issues[0].message, error.issues[0].path[0]];
        setErrorMesage({ ...initError, [path]: message });
        return;
      } else if (isAxiosError<ErrorResponse>(error)) {
        alert(error.response?.data);
      }
    }
  };

  /**
   *@description 등록 취소 클릭 이벤트
   */
  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (tags.length === 0 && groupsOneData) {
      setTags(groupsOneData?.tags.split(","));
    }
  }, []);

  // 수정시, 이전 데이터 추가
  useEffect(() => {
    if (groupsOneData) {
      setForm({
        name: groupsOneData.name,
        description: groupsOneData.description,
        region: groupsOneData.region,
        maxMembers: groupsOneData.maxMembers,
        categoryId: groupsOneData.categoryId,
        imageUrl: groupsOneData.imageUrl,
        tags: groupsOneData.tags,
      });
      setTags(groupsOneData.tags.split(","));
    }
  }, [groupsOneData]);

  return (
    <CommonLayout>
      <BackHeader title={`모임 ${groupId ? "수정" : "등록"}`} />

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
            defaultValue={form.categoryId?.toString()}
            onChange={(val) => setForm((prev) => ({ ...prev, categoryId: Number(val) }))}
            errorMessage={errorMessage["categoryId"]}
          />
        </Card>

        <Card title="모임 조건">
          <LabeledDropdown
            label="모임 지역"
            required
            placeholder="지역을 선택해주세요."
            defaultValue={form.region.toString()}
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
            onChange={onUploadImage}
            previewUrl={form.imageUrl}
          />
        </Card>

        <div className={styles.button_groups}>
          <ActiveButton onClick={onRegister}>{groupId ? "수정" : "등록"}</ActiveButton>

          <ActiveButton onClick={onCancel} buttonStyle="disabled">
            취소
          </ActiveButton>
        </div>
      </section>
    </CommonLayout>
  );
}

export default GroupRegisterPage;
