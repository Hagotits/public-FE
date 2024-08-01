import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authUser, logoutUser } from "../../../redux/thunkFunctions";
import { FaRegHeart, FaRegCircle, FaUser } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoLogOutSharp } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";
import styles from "./HeaderItem.module.css";

const routes = [
  { to: "/signup", name: "회원가입", auth: false },
  { to: "/login", name: "로그인", auth: false },
  { 
    to: "/product/upload",
    auth: true,
    icons: <CiCirclePlus style={{ fontSize: "2rem" }}/>,
  },

  { to: "", auth: true,
    iconss: <FaRegCircle style={{ fontSize: "2rem" }} />
  },

  // { to: "/mypage", name: "마이페이지", auth: true },
  // {
  //   to: "/user/cart",
  //   name: "cart",
  //   auth: true,
  //   icon: <FaRegHeart style={{ fontSize: "1.4rem" }} />,
  // },
  // { to: "/history", name: "주문목록", auth: true },
];

const HeaderItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const cart = useSelector((state) => state.user?.userData?.cart);
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
        className={`text-md leading-7 justify-center w-full flex gap-4 items-center
                    ${mobile && "flex-col bg-gray-900 h-full"} items-center`}
      >
        {routes.map(({ to, name, auth, icon, icons, iconss }) => {
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
          } else if (name) {
            return (
              <li
                key={name}
                className="py-2 text-center border-b-4 cursor-pointer"
              >
                <Link to={to}>{name}</Link>
              </li>
            );
          } else if (icons) {
            return (
              <li key={icons}
                className="py-2 text-center cursor-pointer">
                  <Link to={to}>{icons}</Link>
              </li>
            )
          } else {
            return (
              <Dropdown>
        <Dropdown.Toggle
          as="div"
          id="dropdown-basic"
          className={styles.DropdownToggle}>
          <FaRegCircle style={{ fontSize: "2rem" }}
        />
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.DropdownMenu}>
          <Dropdown.Item href="/mypage" className={styles.DropdownItem}>
            <FaUser className={styles.DropdownItemIcon} />
            MyPage
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} className={styles.DropdownItem}>
            <IoLogOutSharp className={styles.DropdownItemIcon} />
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
            )
          }
        })}
      </ul>
  );
};

export default HeaderItem;