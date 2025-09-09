import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import TestPage from "@/pages/test/TestPage";
import MainSearch from "@/pages/main/search/MainSearch";
import MyGroupTabPage from "@/pages/group/tab/MyGroupTabPage";
import GroupInfoPage from "@/pages/group/info/GroupInfoPage";
import GroupRegisterPage from "@/pages/group/register/GroupRegisterPage";
import PostRegisterPage from "@/pages/post/register/PostRegisterPage";
import PrivacyPage from "@/pages/privacy/PrivacyPage";

/**
 *@description 페이지 라우팅 관리
 */
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="privacy" element={<PrivacyPage />} />

        <Route path="signup" element={<SignupPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="search" element={<MainSearch />} />
        <Route path="group" element={<MyGroupTabPage />} />
        <Route path="group/register" element={<GroupRegisterPage />} />
        <Route path="post/register" element={<PostRegisterPage />} />
        <Route path="group/info" element={<GroupInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
