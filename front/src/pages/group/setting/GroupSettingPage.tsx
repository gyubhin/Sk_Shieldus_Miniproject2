import { Header } from "@/shared/components/header/Header";
import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import styles from "./GroupSettingPage.module.scss";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import MemberList from "@/features/group/_components/info/memberList/MemberList";
import { useNavigate, useParams } from "react-router-dom";
import useSetGroupTab from "@/features/group/_hooks/useSetGroupTab";
import { useGetGroupMemberApi, useGetGroupsOneApi } from "@/features/group/_hooks/query";
import {
  useDeleteGroupsApi,
  useDeleteGroupsMemberApi,
  usePatchDelegateOwner,
} from "@/features/group/_hooks/mutation";
import { useUiStore } from "@/shared/stores/ui.store";
import { isAxiosError } from "axios";
import type { ErrorResponse } from "@/shared/types/api";
import { useGetEventsListApi } from "@/features/event/_hooks/event/query";
import EventItem from "@/features/group/_components/EventItem";
import { useState } from "react";
import { useGetEventAttendeeApi } from "@/features/event/_hooks/attendee/query";
import { EventAttendeesModal } from "@/features/event/_components/attendee/EventAttendeesModal";
import { useDeleteEventEventsApi } from "@/features/event/_hooks/event/mutation";

/**
 *@description 내 모임 탭 > 모임 설정 페이지
 */
function GroupSettingPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();

  const { onChangeTab, activeKey } = useSetGroupTab();
  const [isOpenEventAttendeeModal, setOpenEventAttendeeModal] = useState(false);
  const { showToast } = useUiStore();

  const { data } = useGetGroupsOneApi(groupId);

  // 멤버 추방 api
  const { mutateAsync: mutateKickMember } = useDeleteGroupsMemberApi(groupId);

  // 그룹 삭제 api
  const { mutateAsync: mutateDeleteGroup } = useDeleteGroupsApi();

  // 그룹 위임 api
  const { mutateAsync: mutateDelegate } = usePatchDelegateOwner(groupId);

  // 그룹 멤버 조회 api
  const { data: groupMembers } = useGetGroupMemberApi(groupId);

  // 이벤트 삭제 api
  const { mutateAsync: mutateDeleteEvent } = useDeleteEventEventsApi();

  // 이벤트(일정) 목록 state
  const { data: eventsList } = useGetEventsListApi(groupId);

  const [selectedEvent, setSelectedEvent] = useState<number>();

  // 모임 일정 수정 페이지로  이동
  const onMoveModifyGroup = () => {
    navigate(`/group/register/${groupId}`);
  };

  // 모임원 강퇴
  const onKickMember = async (userId: number) => {
    try {
      const res = await mutateKickMember(userId);

      if (res.status === 204) {
        showToast({ message: "멤버 강퇴 성공", type: "success" });
      }
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        if (error.status === 403) {
          showToast({ message: "잘못된 접근입니다.", type: "error" });
        } else if (error.status === 404) {
          showToast({ message: "멤버를 찾을 수 없습니다.", type: "error" });
        }
      }
    }
  };

  // 모임장 위임 이벤트
  const onDelegateGroup = async (userId: number) => {
    try {
      const res = await mutateDelegate(userId);

      if (res.status === 204) {
        showToast({ message: "모임장 위임 성공", type: "success" });
      }
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        if (error.status === 403) {
          showToast({ message: "잘못된 접근입니다.", type: "error" });
        } else if (error.status === 404) {
          showToast({ message: "멤버를 찾을 수 없습니다.", type: "error" });
        }
      }
    }
  };

  // 모임 삭제
  const onDeleteGroup = async () => {
    if (confirm("정말로 그룹을 삭제하시겠습니까?")) {
      try {
        const res = await mutateDeleteGroup();
        if (res.status === 204) {
          showToast({ type: "success", message: "성공적으로 삭제 되었습니다." });
          navigate(-1);
        }
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          showToast({ type: "error", message: "잘못된 접근입니다." });
        }
      }
    }
  };

  // 이벤트(일정) 삭제
  const onDeleteEvent = async (_eventId: number) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        const res = await mutateDeleteEvent(_eventId);
        if (res.status === 204) {
          showToast({ type: "success", message: "성공적으로 삭제 되었습니다." });
          navigate(-1);
        }
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          showToast({ type: "error", message: "잘못된 접근입니다." });
        }
      }
    }
  };

  // 이벤트(일정) more 선택
  const onManageEvent = (_eventId: number) => {
    setSelectedEvent(_eventId);
    setOpenEventAttendeeModal(true);
  };

  return (
    <CommonLayout>
      {/* 헤더 */}
      <Header />

      {/* 그룹탭 */}
      <section className={styles.top_tab_view}>
        <GroupTab
          tabs={[
            { key: "info", name: "모임 정보" },
            { key: "post", name: "게시판" },
            { key: "setting", name: "모임 설정" },
          ]}
          activeKey={activeKey}
          onChange={onChangeTab}
        />
      </section>

      <section className={styles.actions_wrapper}>
        <button className={styles.action} onClick={onMoveModifyGroup}>
          모임 수정하기
        </button>

        <button onClick={onDeleteGroup} className={styles.action}>
          모임 삭제하기
        </button>
      </section>

      <section className={styles.member_list}>
        <h3>멤버 목록</h3>

        {groupMembers?.data && (
          <MemberList
            groupMembers={groupMembers.data}
            onKickMember={onKickMember}
            onDelegateGroup={onDelegateGroup}
          />
        )}
      </section>

      <section className={styles.event_list}>
        <h3>일정 목록</h3>

        {(eventsList?.content ?? []).map((event) => (
          <EventItem
            data={event}
            onDelete={() => onDeleteEvent(event.id)}
            onManage={() => onManageEvent(event.id)}
          />
        ))}
      </section>

      <EventAttendeesModal
        isOpen={isOpenEventAttendeeModal}
        onClose={() => setOpenEventAttendeeModal(false)}
        eventId={selectedEvent}
      />
    </CommonLayout>
  );
}

export default GroupSettingPage;
