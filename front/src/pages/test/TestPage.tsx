import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { DropdownButton } from "@/shared/components/dropdown/DropdownButton";
import { InputField } from "@/shared/components/input/InputField";
import { SearchInput } from "@/shared/components/input/SearchInput";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { Header } from "@/shared/components/header/Header";
import { GroupTab } from "@/shared/components/tab/GroupTab";
import { useState } from "react";
import { BottomTab } from "@/shared/components/tab/BottomTab";
import { FilterButton } from "@/shared/components/button/FilterButton";
import { GroupSearchItem } from "@/features/group/_components/GroupSearchItem";
import { MyCommentItem } from "@/features/users/_components/MyCommentItem";
import { ScheduleItem } from "@/features/group/_components/ScheduleItem";
import { SectionTitle } from "@/shared/components/title/SectionTitle";
import { CommentItem } from "@/features/comment/_components/CommentItem";
import { Pagination } from "@/shared/components/pagenation/Pagenation";
import { MenuItem } from "@/shared/components/menu/MenuItem";
import ModalConfirm from "@/shared/components/modal/ModalConfirm";
import ActionSheet from "@/shared/components/actionsheet/ActionSheet";

/**
 *@description ui 테스트용 페이지
 */
function TestPage() {
  const [active, setActive] = useState("mycomment");
  const [page, setPage] = useState(1);


  const [openSheet, setOpenSheet] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 32,
      }}
    >
       <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button onClick={() => { console.log("[DEBUG] 액션시트 열기 클릭"); setOpenSheet(true); }}>
          액션시트 열기
        </button>
        <button onClick={() => { console.log("[DEBUG] 삭제 모달 열기 클릭"); setOpenConfirm(true); }}>
          삭제 모달 열기
        </button>
      </div>
      
      <Header />

      <BackHeader
        title={"회원정보 수정"}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <GroupTab
        tabs={[
          { key: "home", name: "홈" },
          { key: "board", name: "게시판" },
        ]}
        activeKey={"home"}
        onChange={() => {}}
      />

      <InputField
        label="아이디"
        name="email"
        placeholder="example.com"
        type="email"
        errorMessage="error"
        successMessage="success"
      />

      <ActiveButton>로그인</ActiveButton>
      <ActiveButton disabled>로그인</ActiveButton>

      <DropdownButton name="날짜" />

      <SearchInput />

      <MyCommentItem
        title={"영어 회화 스터디"}
        content={"시간대가 잘 맞아서 참여하고 싶습니다!"}
        createdAt={"2025.09.05"}
      />

      <div>
        <Pagination totalPages={12} currentPage={10} onChange={setPage} />
      </div>

      <BottomTab />

      <FilterButton label={"날짜"} />

      <div style={{ maxWidth: "400px" }}>
        <MenuItem label={"메뉴"} right="25.05.13" />
      </div>

      <div style={{ maxWidth: "400px" }}>
        <ScheduleItem
          title="토요일 스터디 모임"
          time="내일 오전 11:00"
          location="당산역 커피점"
          imageUrl="https://placehold.co/100x100"
          onMoreClick={() => console.log("더보기 클릭")}
        />
      </div>

      <div style={{ maxWidth: "500px" }}>
        <CommentItem
          author="홍길동"
          content="너무 귀엽네요1"
          createdAt="12시간전"
          onReply={() => console.log("답글달기 클릭")}
          onDelete={() => console.log("삭제 클릭")}
        />
      </div>

      <SectionTitle title={"추천그룹표시"} rightActionLabel="더보기" />

      <div style={{ maxWidth: "360px" }}>
        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart
        />

        <GroupSearchItem
          name="파이썬 프로그래밍"
          description="파이썬 기초부터 실무·AI까지 함께 학습하는 스터디! 10주간 매일 문제 풀이 & 프로젝트 실습 진행 🚀"
          region="강남구"
          maxMembers={6}
          currentMembers={3}
          createdAt="2025.02.04"
          imageUrl="https://placehold.co/600x400"
          tags={["파이썬", "AI"]}
          isHeart={false}
        />
      </div>


      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button onClick={() => setOpenSheet(true)}>액션시트 열기</button>
        <button onClick={() => setOpenConfirm(true)}>삭제 모달 열기</button>
      </div>

      {/* 하단 액션시트 */}
      <ActionSheet
        open={openSheet}
        onClose={() => { console.log("[DEBUG] 액션시트 닫기"); setOpenSheet(false); }}
        onEdit={() => {
          console.log("[DEBUG] 액션시트 수정 클릭");
          setOpenSheet(false);
          alert("수정 클릭됨");
        }}
        onDelete={() => {
          console.log("[DEBUG] 액션시트 삭제 클릭 -> 모달 오픈");
          setOpenSheet(false);
          setOpenConfirm(true);
        }}
      />


      {/* 삭제 확인 모달 */}
      <ModalConfirm
        open={openConfirm}
        title="정말로 삭제하시겠습니까?"
        confirmText={isDeleting ? "삭제중..." : "삭제"}
        cancelText="취소"
        onClose={() => {
          if (isDeleting) return;
          console.log("[DEBUG] 모달 닫기");
          setOpenConfirm(false);
        }}
        onConfirm={async () => {
          if (isDeleting) return;
          try {
            console.log("[DEBUG] 모달 확인 클릭 -> 삭제 진행");
            setIsDeleting(true);
            await new Promise((r) => setTimeout(r, 600)); // TODO: 실제 API로 교체
            alert("삭제 완료!");
          } catch (e) {
            alert("삭제 실패, 다시 시도해주세요.");
          } finally {
            setIsDeleting(false);
            setOpenConfirm(false);
          }
        }}
      />
    </div>
  );
}

export default TestPage;
