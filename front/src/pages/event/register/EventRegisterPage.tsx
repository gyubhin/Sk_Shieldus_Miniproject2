import styles from "./EventRegisterPage.module.scss";
import { BackHeader } from "@/shared/components/header/BackHeader";
import Card from "@/shared/components/card/Card";
import { InputField } from "@/shared/components/input/InputField";
import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { useNavigate, useParams } from "react-router-dom";
import type { PostEventBody } from "@/features/event/_types/body";
import type { EventFormError } from "@/features/event/_types/base";
import { useEffect, useState } from "react";
import { usePatchEventsApi, usePostEventsApi } from "@/features/event/_hooks/event/mutation";
import { useGetEventsDetailApi, useGetEventsListApi } from "@/features/event/_hooks/event/query";
import { eventSchema } from "@/features/event/_schemas/event.schema";
import { isAxiosError } from "axios";
import z from "zod";
import { usePostUploadImage } from "@/features/image/_hooks/mutation";
import { strUtils } from "@/libs/str";
import dayjs from "dayjs";
import { useUploadImage } from "@/features/image/_hooks/useUploadImage";

/**
 *@description 일정 등록/수정 페이지
 */
function EventRegisterPage() {
  // 에러메세지 초기값
  const initError: EventFormError = {
    title: undefined,
    description: undefined,
    imageUrl: undefined,
    location: undefined,
    eventDate: undefined,
    maxAttendees: undefined,
  };

  const initForm: PostEventBody = {
    title: "",
    description: "",
    imageUrl: "",
    location: "",
    eventDate: "",
    maxAttendees: 1,
  };

  const { eventId, groupId } = useParams<{ eventId: string; groupId: string }>();
  const navigate = useNavigate();
  const { refetch: refetchList } = useGetEventsListApi(groupId);

  const { data: eventData } = useGetEventsDetailApi(eventId);
  const [errorMessage, setErrorMesage] = useState(initError);

  const [form, setForm] = useState<PostEventBody>(initForm);

  // 이미지 업로드 훅
  const { onUploadImage, showToast } = useUploadImage({
    onSuccess: (_imageUrl) => {
      setForm((prev) => ({
        ...prev,
        imageUrl: _imageUrl,
      }));
    },
  });

  // 이벤트 등록 api
  const { mutateAsync: createMutate, isPending: isCreatePending } = usePostEventsApi(groupId);

  // 이벤트 수정 api
  const { mutateAsync: updateMutate, isPending: isUpdatePending } = usePatchEventsApi(eventId);

  // 이미지 업로드
  const { mutateAsync: mutateUploadImage } = usePostUploadImage();

  // 폼 수정 이벤트
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "maxAttendees" ? strUtils.toNumber(value) : value,
    }));
  };

  /**
   *@description 등록/수정 이벤트
   */
  const onSubmit = async () => {
    if (isCreatePending || isUpdatePending) return;

    try {
      // 검증 실행
      const validated = eventSchema.parse({ ...form });
      const formattedDate = dayjs(validated.eventDate).format("YYYY-MM-DDTHH:mm:ss");

      if (eventId) {
        // 수정 모드
        const res = await updateMutate({ ...validated, eventDate: formattedDate });
        if (res.status === 200) {
          refetchList();
          showToast({ message: "수정 성공했습니다.", type: "success" });
          navigate(`/group/${groupId}/info`, { replace: true }); // 수정 후 상세로
        }
      } else {
        // 등록 모드
        const res = await createMutate({ ...validated, eventDate: formattedDate });
        if (res.status === 201) {
          refetchList();
          showToast({ message: "등록 성공했습니다.", type: "success" });
          navigate(`/group/${groupId}/info`, { replace: true }); // 등록 후 목록으로
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error;
        const [message, path] = [zodError.issues[0].message, zodError.issues[0].path[0]];
        setErrorMesage({ ...initError, [path]: message });
        return;
      } else if (isAxiosError(error)) {
        const message = error.message;
        showToast({ message: message ?? "", type: "error" });
      }
    }
  };

  /**
   *@description 등록 취소 클릭 이벤트
   */
  const onCancel = () => {
    navigate(`/group/${groupId}/info`, { replace: true });
  };

  // 수정전 데이터 로드
  useEffect(() => {
    if (eventData) {
      setForm({
        title: eventData.title ?? "",
        description: eventData.description ?? "",
        imageUrl: eventData.imageUrl ?? "",
        location: eventData.location ?? "",
        eventDate: eventData.eventDate
          ? dayjs(eventData.eventDate).format("YYYY-MM-DD") // date input에 맞게 포맷
          : "",
        maxAttendees: eventData.maxAttendees ?? 1,
      });
    }
  }, [eventData]);

  return (
    <CommonLayout>
      <BackHeader title={`일정 ${eventId ? "수정" : "등록"}`} />

      <section className={styles.form}>
        <Card title="일정 정보">
          <InputField
            label={"제목"}
            required
            name={"title"}
            placeholder="제목을 입력하세요."
            value={form.title}
            onChange={onChangeForm}
            errorMessage={errorMessage["title"]}
          />

          <InputField
            label={"내용"}
            required
            name={"description"}
            placeholder="일정에 대한 자세한 설명을 입력해주세요."
            value={form.description}
            onChange={onChangeForm}
            errorMessage={errorMessage["description"]}
          />

          <InputField
            label={"날짜"}
            required
            name={"eventDate"}
            type="date"
            placeholder="날짜를 정해주세요."
            value={form.eventDate}
            onChange={onChangeForm}
            errorMessage={errorMessage["eventDate"]}
          />

          <InputField
            label={"일정 장소"}
            required
            name={"location"}
            type="text"
            placeholder="장소를 입력하세요."
            value={form.location}
            onChange={onChangeForm}
            errorMessage={errorMessage["location"]}
          />

          <InputField
            label={"최대 인원 수"}
            required
            value={form.maxAttendees}
            onChange={onChangeForm}
            name={"maxAttendees"}
            placeholder="최대 참여 인원을 입력하세요."
            errorMessage={errorMessage["maxAttendees"]}
          />

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
          <ActiveButton onClick={onSubmit}>{eventId ? "수정" : "등록"}</ActiveButton>

          <ActiveButton onClick={onCancel} buttonStyle="disabled">
            취소
          </ActiveButton>
        </div>
      </section>
    </CommonLayout>
  );
}

export default EventRegisterPage;
