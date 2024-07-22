import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderItem from "./Sections/HeaderItem";
import "../../style/Header.css";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  return (
    <div className="background">
      <div className="width">
        <div className="items">
          {/* Logo */}
          <div className="logo">
            <Link to="/">PUBLICK MARKET</Link>
          </div>
          {/* Div  */}
          <div className="flex-box sm-hidden">
            <button onClick={handleMenu} aria-expanded={menu}>
              {menu ? "-" : "+"}
            </button>
          </div>
          {/* Large Header  */}
          <div className="large-header sm-block">
            <HeaderItem />
          </div>
          {/* Small Header  */}
          <div className={`small-header ${menu ? "block" : "hidden"}`}>
            <HeaderItem mobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
