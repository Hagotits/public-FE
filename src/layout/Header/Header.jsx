import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderItem from "./Sections/HeaderItem";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="relative z-10 text-black bg-white w-screen border-b">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          {/* Logo */}
          <div className="flex items-center text-xl text-[rgb(80,81,255)] font-bold h-14">
            <Link
              to="/"
              className="text-inherit no-underline visited:text-inherit"
            >
              PUBLICK MARKET
            </Link>
          </div>

          {/* Div  */}
          <div className="flex-xl sm:hidden">
            <button onClick={handleMenu} aria-expanded={menu}>
              {menu ? "-" : "+"}
            </button>
          </div>

          {/* Large Header  */}
          <div className="hidden sm:block">
            <HeaderItem />
          </div>

          {/* Small Header  */}
          <div className="block sm:hidden">
            {/* {`${menu ? "block" : "hidden"}`} */}
            {menu && <HeaderItem mobile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
