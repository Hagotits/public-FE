import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/Main.css";

export default function Main() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user?.isAuth);
  // 여기 useSelector 쓰는 법 찾은듯?
  const userId = useSelector((state) => state.user?.userData);

  const handleSignUp = () => {
    navigate("/signup");
  };
  useEffect(() => {
    if (isAuth) {
      console.log(userId);
    }
  });

  return (
    <div className="MainPage">
      <div className="subdiv">
        <div className="leftdiv">figma상 왼쪽 파란 박스</div>
        <div className="rightdiv">
          <div className="title">믿을만한 학생들의 공동구매</div>
          <div className="content">
            거래하며 서로 물건과 정을 나누어요
            <br />
            같이 사면 기쁨도 두 배!
          </div>
          {!isAuth && (
            <div className="button">
              <button className="btn" type="button" onClick={handleSignUp}>
                회원가입하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
