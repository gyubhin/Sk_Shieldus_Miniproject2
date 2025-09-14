import { CommonLayout } from "@/shared/components/layout/CommonLayout";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { MenuItem } from "@/shared/components/menu/MenuItem";
import { useGetNotices } from "@/features/notice/_hooks/query";
import dayjs from "dayjs";
import styles from "./NoticePage.module.scss";
import { useState } from "react";

/**
 *@description 공지사항 페이지
 */
function NoticePage() {
  const { data } = useGetNotices();
  const [open, setOpen] = useState(0);
  return (
    <CommonLayout>
      <BackHeader title={"공지사항"} />

      <section>
        {(data ?? []).map((item) => (
          <div key={item.id}>
            <MenuItem
              onClick={() => setOpen(item.id)}
              label={item.title}
              right={dayjs(item.createdAt).format("YYYY.MM.DD")}
            />

            {open === item.id && <p className={styles.content}>{item.content}</p>}
          </div>
        ))}
      </section>
    </CommonLayout>
  );
}

export default NoticePage;
