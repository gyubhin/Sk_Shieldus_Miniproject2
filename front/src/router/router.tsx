import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import MainSearch from "@/pages/main/search/MainSearch";
import MyGroupTabPage from "@/pages/group/tab/MyGroupTabPage";
import GroupInfoPage from "@/pages/group/info/GroupInfoPage";
import GroupRegisterPage from "@/pages/group/register/GroupRegisterPage";
import PostRegisterPage from "@/pages/group/post/register/PostRegisterPage";
import PrivacyPage from "@/pages/privacy/PrivacyPage";
import GroupPostPage from "@/pages/group/post/GroupPostPage";
import Mypage from "@/pages/mypage/Mypage";
import SettingPage from "@/pages/mypage/setting/SettingPage";
import NoticePage from "@/pages/mypage/setting/notice/NoticePage";
import ProfileEditPage from "@/pages/mypage/profileEdit/ProfileEditPage";
import EventRegisterPage from "@/pages/event/register/EventRegisterPage";
import GroupSettingPage from "@/pages/group/setting/GroupSettingPage";
import { useGetUserInfo } from "@/features/users/_hooks/query";
import EggPage from "@/pages/egg/EggPage";
import NotFoundPage from "@/pages/notFound/NotFoundPage";

/**
 *@description 페이지 라우팅 관리
 */
function Router() {
  useGetUserInfo();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* AUTH */}
        <Route path="login" element={<LoginPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="search" element={<MainSearch />} />

        {/* 내모임 */}
        <Route path="group" element={<MyGroupTabPage />} />
        <Route path="group/register" element={<GroupRegisterPage />} />
        <Route path="group/register/:groupId" element={<GroupRegisterPage />} />
        <Route path="group/:groupId/info" element={<GroupInfoPage />} />
        <Route path="group/:groupId/setting" element={<GroupSettingPage />} />

        {/* 게시글(POST) */}
        <Route path="group/:groupId/post" element={<GroupPostPage />} />
        <Route path="group/:groupId/post/register" element={<PostRegisterPage />} />
        <Route path="group/:groupId/post/register/:postId" element={<PostRegisterPage />} />

        {/* 일정 */}
        <Route path="group/:groupId/event/register" element={<EventRegisterPage />} />
        <Route path="group/:groupId/event/register/:eventId" element={<EventRegisterPage />} />

        {/* 내정보 */}
        <Route path="mypage" element={<Mypage />} />
        <Route path="mypage/setting" element={<SettingPage />} />
        <Route path="mypage/edit" element={<ProfileEditPage />} />
        <Route path="mypage/setting/notice" element={<NoticePage />} />

        {/* EGG */}
        <Route path="egg" element={<EggPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
