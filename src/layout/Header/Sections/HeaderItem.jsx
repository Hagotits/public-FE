import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/thunkFunctions";
import { FaUser } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoLogOutSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import styles from "./HeaderItem.module.css";
import { toast } from "react-toastify";

const routes = [
  { to: "/signup", name: "회원가입", auth: false },
  { to: "/login", name: "로그인", auth: false },
  {
    to: "/product/upload",
    auth: true,
    icons: <CiCirclePlus style={{ fontSize: "2rem" }} />,
  },
  {
    to: "",
    auth: true,
    iconss: <HiOutlineUserCircle style={{ fontSize: "2rem" }} />,
  },
];

const HeaderItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const cart = useSelector((state) => state.user?.userData?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).then(() => {
        navigate("/login");
      });
      toast.info("로그아웃을 완료 했습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul
      className={`text-md leading-7 justify-center w-full flex gap-4 items-center
                  ${mobile && "flex-col bg-gray-900 h-full"} items-center`}
    >
      {routes.map(({ to, name, auth, icon, icons, iconss }, index) => {
        if (isAuth !== auth) return null;
        if (name === "로그아웃") {
          return (
            <li
              key={`logout-${index}`}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else if (icon) {
          return (
            <li
              key={`icon-${index}`}
              className="relative py-2 text-center border-b-4 cursor-pointer"
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
              key={`name-${index}`}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link to={to}>{name}</Link>
            </li>
          );
        } else if (icons) {
          return (
            <li
              key={`icons-${index}`}
              className="py-2 text-center cursor-pointer"
            >
              <Link to={to}>{icons}</Link>
            </li>
          );
        } else if (iconss) {
          return (
            <li
              key={`iconss-${index}`}
              className="relative py-2 text-center cursor-pointer"
            >
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={styles.DropdownToggle}
              >
                {iconss}
              </button>
              {dropdownOpen && (
                <div className={styles.DropdownMenu} ref={dropdownRef}>
                  <Link to="/mypage" className={styles.DropdownItem}>
                    <FaUser className={styles.DropdownItemIcon} />
                    MyPage
                  </Link>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className={styles.DropdownItem}
                  >
                    <IoLogOutSharp className={styles.DropdownItemIcon} />
                    Log out
                  </button>
                </div>
              )}
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default HeaderItem;
