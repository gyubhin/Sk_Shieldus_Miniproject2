import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import styles from "./GroupInfoPage.module.scss";
import EventItem from "@/features/group/_components/EventItem";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import GroupBanner from "@/features/group/_components/info/banner/GroupBanner";
import GroupInfoContent from "@/features/group/_components/info/content/GroupInfoContent";
import MemberList from "@/features/group/_components/info/memberList/MemberList";
import { useNavigate, useParams } from "react-router-dom";
import useSetGroupTab from "@/features/group/_hooks/useSetGroupTab";
import { useGetGroupMemberApi, useGetGroupsOneApi } from "@/features/group/_hooks/query";
import { useGetEventsListApi } from "@/features/event/_hooks/event/query";
import ActionSheet from "@/shared/components/actionsheet/ActionSheet";
import { useState } from "react";
import {
  useDeleteCancelEventAttendeeApi,
  usePostEventsAttendeeApi,
} from "@/features/event/_hooks/attendee/mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import { isAxiosError } from "axios";
import { useUserId } from "@/features/users/_hooks/useUserId";

/**
 *@description 내 모임 탭 > 모임 정보 페이지
 */
function GroupInfoPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();

  const [isEventMoreOpen, setEventMoreOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number>();
  const { showToast } = useUiStore();
  const userId = useUserId();

  const { data } = useGetGroupsOneApi(groupId);

  console.log(data?.ownerId);
  const isOwner = Number(userId) === data?.ownerId;

  const tabs = isOwner
    ? [
        { key: "info", name: "모임 정보" },
        { key: "post", name: "게시판" },
        { key: "setting", name: "모임 설정" },
      ]
    : [
        { key: "info", name: "모임 정보" },
        { key: "post", name: "게시판" },
      ];

  // 이벤트(일정) 목록 state
  const { data: eventsList } = useGetEventsListApi(groupId);

  // 탭 활성화 이벤트, state
  const { onChangeTab, activeKey } = useSetGroupTab();

  // 그룹 상세정보 state

  // 그룹 멤버 state
  const { data: groupMembers } = useGetGroupMemberApi(groupId);

  const { mutateAsync: mutateAttend } = usePostEventsAttendeeApi();
  const { mutateAsync: mutateDelete } = useDeleteCancelEventAttendeeApi();

  // 탈퇴
  const onWithdrawl = (eventId?: number) => {
    if (!eventId) {
      showToast({
        message: "잘못된 접근입니다.",
        type: "error",
      });
      return;
    }

    mutateDelete(eventId)
      .then((response) => {
        if (response.status === 200) {
          showToast({
            message: "일정에 나갔습니다.",
            type: "success",
          });
        }
      })
      .catch((error) => {
        let message = "";
        if (isAxiosError(error)) {
          if (error.status === 409) {
            message = "이미 일정에 나갔습니다.";
          } else if (error.status === 500) {
            message = "관리자에게 문의 부탁드립니다.";
          } else {
            message = "잘못된 접근입니다.";
          }
        }

        showToast({
          message: message,
          type: "error",
        });
      });

    setEventMoreOpen(false);
  };

  // 참석
  const onAttendAndModify = (eventId?: number) => {
    if (!eventId) {
      showToast({
        message: "잘못된 접근입니다.",
        type: "error",
      });
      return;
    }

    if (isOwner) {
      navigate(`/group/${groupId}/event/register/${eventId}`);
      return;
    }

    mutateAttend(eventId)
      .then((response) => {
        if (response.status === 200) {
          showToast({
            message: "일정에 참석되었습니다.",
            type: "success",
          });
        }
      })
      .catch((error) => {
        let message = "";
        if (isAxiosError(error)) {
          if (error.status === 409) {
            message = "일정에 참석되었습니다.";
          } else if (error.status === 400) {
            message = "일정이 초과되었습니다.";
          } else if (error.status === 500) {
            message = "관리자에게 문의 부탁드립니다.";
          } else {
            message = "잘못된 접근입니다.";
          }
        }

        showToast({
          message: message,
          type: "error",
        });
      });

    setEventMoreOpen(false);
  };

  // 모임 일정 등록 페이지로  이동
  const onMoveRegisterEvent = () => {
    navigate(`/group/${groupId}/event/register`);
  };

  // 이벤트(일정) more 선택
  const onSelectedEvent = (_eventId: number) => {
    setSelectedEvent(_eventId);
    setEventMoreOpen(true);
  };

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 그룹탭 */}
      <section className={styles.top_tab_view}>
        <GroupTab tabs={tabs} activeKey={activeKey} onChange={onChangeTab} />
      </section>

      {/* 모임 배너 이미지 */}
      <GroupBanner url={data?.imageUrl} />

      {data && <GroupInfoContent data={data} />}

      <SectionTitle
        title={"정모 일정 4"}
        rightActionLabel="+ 일정 생성"
        onActionClick={onMoveRegisterEvent}
      />

      <section className={styles.schedule_view}>
        {(eventsList?.content ?? []).map((event) => (
          <EventItem data={event} onMoreClick={() => onSelectedEvent(event.id)} />
        ))}
      </section>

      {groupMembers && <MemberList groupMembers={groupMembers} />}

      <ActionSheet
        open={isEventMoreOpen}
        firstText={isOwner ? "수정" : "참여"}
        secondText="취소"
        onClickFirst={() => onAttendAndModify(selectedEvent)}
        onClickSecond={() => onWithdrawl(selectedEvent)}
        onClose={() => setEventMoreOpen(false)}
        destructive="second"
      />
    </CommonLayout>
  );
}

export default GroupInfoPage;
