import React from "react";
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  const handleMain = () => {
    navigate("/main");
  }

  return (
    <div className="background">
      <div className="subdiv">
        <div className="logo">
          <button className="btn" type="button" onClick={handleMain}>
            PUBLIC MARKET
          </button>
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
  )
}