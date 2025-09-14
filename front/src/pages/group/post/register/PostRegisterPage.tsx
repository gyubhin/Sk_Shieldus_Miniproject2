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
import { useCreatePostsApi, usePatchPostApi } from "@/features/post/_hooks/mutation";
import { postSchema } from "@/features/post/_schemas/post.schema";
import z from "zod";
import { usePostDetailApi } from "@/features/post/_hooks/query";
import { useUiStore } from "@/shared/stores/ui.store";
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

  const { groupId, postId } = useParams<{ groupId: string; postId: string }>();
  const { showToast } = useUiStore();

  const { data } = usePostDetailApi(Number(groupId), Number(postId));

  const navigate = useNavigate();
  const [errorMessage, setErrorMesage] = useState(initError);
  const [form, setForm] = useState<CreatePostBody>(
    postId
      ? {
          title: data?.title ?? "",
          content: data?.content ?? "",
        }
      : initForm,
  );
  const [imageFile, setImageFile] = useState<File>();

  const { mutateAsync: createMutate } = useCreatePostsApi(Number(groupId));
  const { mutateAsync: updateMutate } = usePatchPostApi(Number(groupId), Number(postId));

  // 폼 수정 이벤트
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   *@description 등록/수정 이벤트
   */
  const onSubmit = async () => {
    try {
      // 검증 실행
      const validated = postSchema.parse({ ...form });

      if (imageFile instanceof File) {
        // TODO 서버가 이미지 로직 추가하면 추가할 예정
        // formData.append("image", imageFile);
      }

      if (postId) {
        // 수정 모드
        const res = await updateMutate(validated);
        if (res.status === 200) {
          alert("수정 성공했습니다.");
          navigate(`/group/${groupId}/post/`, { replace: true }); // 수정 후 상세로
        }
      } else {
        // 등록 모드
        const res = await createMutate(validated);
        if (res.status === 201) {
          showToast({ message: "등록 성공했습니다.", type: "success" });
          navigate(`/group/${groupId}/post`, { replace: true }); // 등록 후 목록으로
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error;
        const [message, path] = [zodError.issues[0].message, zodError.issues[0].path[0]];
        setErrorMesage({ ...initError, [path]: message });
        return;
      } else if (isAxiosError<ErrorResponse>(error)) {
        const message = error.message;
        showToast({ message: message ?? "", type: "error" });
      }
    }
  };

  /**
   *@description 등록 취소 클릭 이벤트
   */
  const onCancel = () => {
    navigate(`/group/${groupId}/post`, { replace: true });
  };

  return (
    <CommonLayout>
      <BackHeader title={`게시글 ${postId ? "수정" : "등록"}`} />

      <section className={styles.form}>
        <Card title="게시글 정보">
          <InputField
            required
            label={"제목"}
            name={"title"}
            placeholder="제목을 입력하세요."
            value={form.title}
            onChange={onChangeForm}
            errorMessage={errorMessage["title"]}
          />
          <InputField
            required
            label={"내용"}
            name={"content"}
            value={form.content}
            placeholder="내용을 입력하세요."
            onChange={onChangeForm}
            errorMessage={errorMessage["content"]}
          />

          <InputField
            label={"이미지 업로드"}
            name={"image"}
            placeholder="이미지 업로드하기"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
              }
            }}
          />
        </Card>

        <div className={styles.buttons}>
          <ActiveButton onClick={onSubmit}>{`${postId ? "수정" : "등록"}`}</ActiveButton>
          <ActiveButton onClick={onCancel} buttonStyle="disabled">
            취소
          </ActiveButton>
        </div>
      </section>
    </CommonLayout>
  );
}

export default PostRegisterPage;
