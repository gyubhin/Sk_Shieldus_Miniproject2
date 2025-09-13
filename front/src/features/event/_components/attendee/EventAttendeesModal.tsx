import { useState } from "react";
import styles from "./EventAttendeesModal.module.scss";
import { patchAttendeeStatusApi } from "../../_apis/attendee.api";
import type { PatchAttendeeStatusBody } from "../../_types/body";
import type { GetEventsAttendeesResponse } from "../../_types/response";
import { useGetEventAttendeeApi } from "../../_hooks/attendee/query";
import { usePatchAttendeeStatusApi } from "../../_hooks/attendee/mutation";
import { fi } from "zod/locales";
import { isAxiosError } from "axios";
import { useUiStore } from "@/shared/stores/ui.store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  eventId?: number;
  isAdmin?: boolean; // 주최자/관리자인 경우 true
};

/**
 *@description event(일정) 참석자 관리 모달
 */
export function EventAttendeesModal({ isOpen, onClose, eventId }: Props) {
  if (!isOpen || !eventId) return null;

  const role = {
    OWNER: "모임장",
    MEMBER: "모임원",
  };

  const { refetch, data: attendees } = useGetEventAttendeeApi(eventId);
  const { mutateAsync: mutatePatchAttend } = usePatchAttendeeStatusApi(eventId);
  const { showToast } = useUiStore();

  // 참석자 관리 이벤트
  const onManageAttendance = async (userId: number, status: PatchAttendeeStatusBody["status"]) => {
    const body: PatchAttendeeStatusBody = {
      userId,
      status,
    };

    try {
      const res = await mutatePatchAttend(body);

      if (res.status === 200) {
        refetch();
        showToast({ message: "성공적으로 처리되었습니다.", type: "success" });
      }
    } catch (error) {
      //
      if (isAxiosError(error)) {
        if (error.status === 409) {
          showToast({ message: "중복 요청입니다.", type: "error" });
        } else if (error.status === 404) {
          showToast({ message: "멤버를 찾을 수 없습니다.", type: "error" });
        }
      }
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>이벤트 참석자 관리</h2>
          <button onClick={onClose}>✕</button>
        </header>

        {/* 참석자 */}
        <section className={styles.section}>
          <h3>참석자 ({attendees?.confirmed.length ?? ""})</h3>
          <ul>
            {(attendees?.confirmed ?? []).map((attendee) => (
              <li key={attendee.userId} className={styles.item}>
                <div className={styles.attendee_info}>
                  <span className={styles.nickname}>{attendee.username}</span>
                  <span className={styles.role}>{role[attendee.role]}</span>
                </div>

                {attendee.role === "MEMBER" && (
                  <div className={styles.actions}>
                    <button onClick={() => onManageAttendance(attendee.userId, "CANCELLED")}>
                      취소
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* 대기자 */}
        <section className={styles.section}>
          <h3>대기자 ({attendees?.waiting.length ?? ""})</h3>
          <ul>
            {(attendees?.waiting ?? []).map((attendee) => (
              <li key={attendee.userId} className={styles.item}>
                <div className={styles.attendee_info}>
                  <span className={styles.nickname}>{attendee.username}</span>
                  <span className={styles.role}>{role[attendee.role]}</span>
                </div>

                <div className={styles.actions}>
                  <button onClick={() => onManageAttendance(attendee.userId, "GOING")}>승인</button>
                  <button onClick={() => onManageAttendance(attendee.userId, "CANCELLED")}>
                    취소
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
