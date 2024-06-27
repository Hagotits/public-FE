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
import "./App.css";
import Login from "./views/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authUser } from "./redux/thunkFunctions";
import ProtectedRoutes from "./appointment/ProtectedRoutes";
import NotAuthRoutes from "./appointment/NotAuthRoutes";

function Layout() {
  return (
    <div className="layout">
      {/* <Header /> */}
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
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpassword" element={<FindPassword />} />


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
