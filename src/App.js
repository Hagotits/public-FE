import React, { useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./redux/thunkFunctions";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ProtectedRoutes from "./appointment/ProtectedRoutes";
import NotAuthRoutes from "./appointment/NotAuthRoutes";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import FindId from "./views/FindId";
import FindPassword from "./views/FindPassword";
import ResetPassword from "./components/ResetPassword";
import MyPage from "./views/MyPage";
import Write from "./views/Write";
import Header from "./components/Header";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Outlet />
    </div>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();
  const { planId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
      if (pathname === "/") {
        navigate("/");
      }
    }
  }, [dispatch, pathname, isAuth, navigate, planId]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/find/id" element={<FindId />} />
        <Route path="/find/password" element={<FindPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/write" element={<Write />} />
        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes />}></Route>
        {/* 로그인 한 사람은 갈 수 없는 경로 */}~
        <Route element={<NotAuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
