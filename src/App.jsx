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
import Main from "./pages/MainPage/index";
import CartPage from "./pages/CartPage/index";
import DetailProductPage from "./pages/DetailProductPage/index";
import HistoryPage from "./pages/HistoryPage/index";
import ProtectedPage from "./pages/ProtectedPage/index";
import UploadProductPage from "./pages/UploadProductPage/index";

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
        navigate("/");
      }
    }
  }, [dispatch, pathname, isAuth, navigate, postId]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 누구나 갈 수 있는 경로 */}
        <Route index element={<Main />} />

        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/products/:productId" element={<DetailProductPage />} />
          <Route path="/product/upload" element={<UploadProductPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        {/* 로그인 한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
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
