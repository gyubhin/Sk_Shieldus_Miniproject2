import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";

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
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
