import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import TestPage from "@/pages/test/TestPage";
import MainSearch from "@/pages/main/search/MainSearch";

/**
 *@description 페이지 라우팅 관리
 */
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="search" element={<MainSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
