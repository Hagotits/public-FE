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
import { GoBell } from "react-icons/go";
import Alert from "./Alert";
import { TiDelete } from "react-icons/ti";

const routes = [
  { to: "/signup", name: "회원가입", auth: false },
  { to: "/login", name: "로그인", auth: false },
  {
    to: "/product/upload",
    auth: true,
    uploadIcon: <CiCirclePlus style={{ fontSize: "2rem" }} />,
  },
  {
    to: "",
    auth: true,
    userIcon: <HiOutlineUserCircle style={{ fontSize: "2rem" }} />,
  },
  {
    to: "",
    auth: true,
    bellIcon: <GoBell style={{ fontSize: "1.7rem" }} />,
  }
];

const HeaderItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const cart = useSelector((state) => state.user?.userData?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alert, setAlert] = useState(false); // 알림창
  const bellBackground = useRef(); // 알림창 배경 누르면 사라지게 하기 위함

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
      {routes.map(({ to, name, auth, icon, bellIcon, uploadIcon, userIcon }, index) => {
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
        } else if (uploadIcon) {
          return (
            <li
              key={`uploadIcon-${index}`}
              className="py-2 text-center cursor-pointer"
            >
              <Link to={to}>{uploadIcon}</Link>
            </li>
          );
        } else if (userIcon) {
          return (
            <li
              key={`userIcon-${index}`}
              className="relative py-2 text-center cursor-pointe mt-[7px]"
            >
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={styles.DropdownToggle}
              >
                {userIcon}
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
        } else if (bellIcon) {
          return (
            <li
              key={`bellIcon-${index}`}
              className="relative py-2 text-center cursor-pointer mt-[7px]"
            >
              <div>
                <button
                  onClick={() => setAlert(true)}>
                  {bellIcon}
                </button>
              </div>
              {
                alert && 
                <div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  ref={bellBackground}
                  onClick={(e) => {
                    if (e.target === bellBackground.current) {
                      setAlert(false);
                    }
                  }}
                >
                  <div className="absolute right-10">
                    <div className="relative">
                      <button
                        // style={fontSize: 2rem}
                        className="absolute right-1 mt-3 z-50"
                        onClick={() => setAlert(false)}
                      >
                        <TiDelete style={{ fontSize: "1.5rem" }}/>
                      </button>
                      <Alert />
                    </div>
                  </div>
                </div>
              }
            </li>
          )
        }
        return null;
      })}
    </ul>
  );
};

export default HeaderItem;
