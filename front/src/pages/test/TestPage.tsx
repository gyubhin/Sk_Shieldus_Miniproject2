import { ActiveButton } from "@/shared/components/button/ActiveButton";
import { DropdownButton } from "@/shared/components/dropdown/DropdownButton";
import { InputField } from "@/shared/components/input/InputField";
import { SearchInput } from "@/shared/components/input/SearchInput";
import { BackHeader } from "@/shared/components/header/BackHeader";
import { Header } from "@/shared/components/header/Header";
import { GroupTab } from "@/shared/components/tab/GroupTab";

/**
 *@description ui 테스트용 페이지
 */
function TestPage() {
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
      <Header />

      <InputField
        label="아이디"
        name="email"
        placeholder="example.com"
        type="email"
        errorMessage="error"
        successMessage="success"
      />

      <ActiveButton disabled>test</ActiveButton>

      <DropdownButton name="test" />

      <SearchInput />

      <BackHeader
        title={"회원정보 수정"}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <GroupTab
        tabs={[
          { key: "home", label: "홈" },
          { key: "board", label: "게시판" },
        ]}
        activeKey={"home"}
        onChange={() => {}}
      />
    </div>
  );
}

export default TestPage;
