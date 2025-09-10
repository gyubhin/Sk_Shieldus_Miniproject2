import styles from "./PostRegisterPage.module.scss";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { useState } from "react";
import type { CreatePostBody } from "@/features/post/_types/body";
import type { PostRegisterFormError } from "@/features/post/_types/base";
import { useNavigate, useParams, type ErrorResponse } from "react-router-dom";
import { useCreatePostsApi } from "@/features/post/_hooks/mutation";
import { postSchema } from "@/features/post/_schemas/post.schema";
import z from "zod";
import { isAxiosError } from "axios";

/**
 *@description 게시글 등록/수정 페이지
 */
function PostRegisterPage() {
  // 에러메세지 초기값
  const initError: PostRegisterFormError = {
    title: undefined,
    content: undefined,
  };

  const initForm: CreatePostBody = {
    title: "",
    content: "",
  };

  const { groupId } = useParams<{ groupId: string }>();

  const navigate = useNavigate();
  const [errorMessage, setErrorMesage] = useState(initError);
  const [form, setForm] = useState<CreatePostBody>(initForm);

  const { mutateAsync } = useCreatePostsApi(Number(groupId));

  // 폼 수정 이벤트
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   *@description 등록 이벤트
   */
  const onRegister = async () => {
    try {
      // 검증 실행
      const validated = postSchema.parse({ ...form });
      const res = await mutateAsync(validated);

      if (res.status === 201) {
        alert("성공했습니다.");
        navigate(`/group/${groupId}/post`, { replace: true });
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
        <Card title="게시글 정보">
          <InputField
            required
            label={"제목"}
            name={"title"}
            placeholder="제목을 입력하세요."
            onChange={onChangeForm}
            errorMessage={errorMessage["title"]}
          />
          <InputField
            required
            label={"내용"}
            name={"content"}
            placeholder="내용을 입력하세요."
            onChange={onChangeForm}
            errorMessage={errorMessage["content"]}
          />

          <InputField
            label={"이미지 업로드"}
            name={"image"}
            placeholder="이미지 업로드하기"
            type="file"
          />
        </Card>

        <div className={styles.buttons}>
          <ActiveButton onClick={onRegister}>등록</ActiveButton>
          <ActiveButton buttonStyle="disabled">취소</ActiveButton>
        </div>
      </section>
    </CommonLayout>
  );
}

export default PostRegisterPage;
