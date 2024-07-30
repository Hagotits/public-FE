import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/thunkFunctions";
import { FaRegHeart } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const routes = [
  { to: "/signup", name: "회원가입", auth: false },
  { to: "/login", name: "로그인", auth: false },
  { to: "/mypage", name: "마이페이지", auth: true },
  { 
    to: "/product/upload",
    auth: true,
    icons: <CiCirclePlus style={{ fontSize: "2rem" }}/>,
  },
  {
    to: "/user/cart",
    name: "cart",
    auth: true,
    icon: <FaRegHeart style={{ fontSize: "1.4rem" }} />,
  },
  { to: "/history", name: "주문목록", auth: true },
  { to: "", name: "로그아웃", auth: true },
];

const HeaderItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const cart = useSelector((state) => state.user?.userData?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(userData);

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
      className={`text-md leading-7 justify-center w-full flex gap-4 items-center
                  ${mobile && "flex-col bg-gray-900 h-full"} items-center`}
    >
      {routes.map(({ to, name, auth, icon, icons }) => {
        if (isAuth !== auth) return null;
        if (name === "로그아웃") {
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else if (icon) {
          return (
            <li
              className="relative py-2 text-center border-b-4 cursor-pointer"
              key={name}
            >
              <Link to={to}>
                {icon}
                <span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3">
                  {cart?.length}
                </span>
              </Link>
            </li>
          );
        } else if(name) {
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link to={to}>{name}</Link>
            </li>
          );
        } else {
          return (
            <li key={icons}
              className="py-2 text-center border-b-4 cursor-pointer">
                <Link to={to}>{icons}</Link>
            </li>
          )
        }
      })}
    </ul>
  );
};

export default HeaderItem;
