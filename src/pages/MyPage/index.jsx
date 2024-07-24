import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from '../../layout/Header/Header';
import "../../style/MyPage.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartPage from '../CartPage/index';

const MyPage = () => {
  const [activeCategory, setActiveCategory] = useState("판매 물품");
  
  return (
    <div className="MyPage">
      <div className="MypageSub">
        <div className="userInfo">
          <div className="userImg" />
          <div className="userSub">
            <div className="userName">하가형</div>
            <div className="userBtn">
              <button className="profile">프로필 수정</button>
              <button className="userOut">회원 탈퇴</button>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <button
            className="category"
            onClick={() => setActiveCategory("판매 물품")}>
              판매 물품
          </button>
          <button
            className="category"
            onClick={() => setActiveCategory("관심 목록")}>
              관심 목록
          </button>
          <button
            className="category"
            onClick={() => setActiveCategory("거래 완료")}>
              거래 완료
          </button>
          <button
            className="category"
            onClick={() => setActiveCategory("거래 후기")}>
              거래 후기
          </button>
        </div>
        <div className="subContent">
          {activeCategory === "판매 물품" && <div>판매 물품</div>}
          {activeCategory === "관심 목록" && <CartPage />}
          {activeCategory === "거래 완료" && <div>거래 완료</div>}
          {activeCategory === "거래 후기" && <div>거래 후기</div>}
        </div>
      </div>
    </div>
  );
}

export default MyPage;