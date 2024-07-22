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
import Header from "./layout/Header/Header";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import Login from "./pages/LoginPage/index";
import SignUp from "./pages/SignUpPage/index";
import FindPassword from "./pages/PasswordUtilPage/FindPassword";
import ResetPassword from "./pages/PasswordUtilPage/ResetPassword";
import MyPage from "./pages/MyPage/index";
import Write from "./pages/ArticlePage/Write";
import Main from "./pages/MainPage/index";
import Fleamarket from "./pages/MainPage/index";
import Articles from "./pages/ArticlePage/Articles";
import CartPage from "./pages/CartPage/index";

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
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
      if (pathname === "/") {
        navigate("/fleamarket");
      }
    }
  }, [dispatch, pathname, isAuth, navigate, postId]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 누구나 갈 수 있는 경로 */}
        <Route index element={<Main />} />

        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/fleamarket" element={<Fleamarket />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:postId" element={<Articles />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* 로그인 한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/find/password" element={<FindPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
