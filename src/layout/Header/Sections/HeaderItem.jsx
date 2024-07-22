import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/thunkFunctions";
import "../../../style/HeaderItem.css";
import { AiOutlineShoppingCart } from "react-icons/ai";

const routes = [
  { to: "/signup", name: "회원가입", auth: false },
  { to: "/login", name: "로그인", auth: false },
  { to: "/mypage", name: "마이페이지", auth: true },
  { to: "/write", name: "업로드", auth: true },
  {
    to: "/user/cart",
    name: "카트",
    auth: true,
    icon: <AiOutlineShoppingCart style={{ fontSize: "1.4rem" }} />,
  },
  { to: "", name: "로그아웃", auth: true },
];

const HeaderItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul
      className={`ul ${
        mobile ? "flex-col bg-gray-900 h-full" : ""
      } items-center`}
    >
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null;
        if (name === "로그아웃") {
          return (
            <li key={name} className="list">
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else {
          return (
            <li key={name} className="list">
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default HeaderItem;
