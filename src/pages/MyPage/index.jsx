import React, { useState } from "react";
import CartPage from "../CartPage/index";
import SelledItem from "./Sections/SelledItem";
import EndDeal from "./Sections/EndDeal";
import ReceiveReview from "./Sections/ReceiveReview";
import SendReview from "./Sections/SendReview";
import Profile from "./Sections/Profile";

const MyPage = () => {
  const [activeCategory, setActiveCategory] = useState("판매 물품");

  return (
    <div
      id="전체"
      className="w-full h-screen bg-white flex flex-col items-center"
    >
      <div className="w-full">
        <Profile />
      </div>
      <div className="w-full">
        <div
          id="나의 거래활동"
          className="w-full flex flex-row justify-between mt-2.5 mb-5 border-b border-gray-300 "
        >
          <button
            id="판매 물품"
            className={`flex-grow h-12 mr-1.5 border-none bg-white text-gray-800 font-bold border-b-2 ${
              activeCategory === "판매 물품"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveCategory("판매 물품")}
          >
            판매 물품
          </button>
          <button
            id="관심 목록"
            className={`flex-grow h-12 mr-1.5 border-none bg-white text-gray-800 font-bold border-b-2 ${
              activeCategory === "관심 목록"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveCategory("관심 목록")}
          >
            관심 목록
          </button>
          <button
            id="거래 완료"
            className={`flex-grow h-12 mr-1.5 border-none bg-white text-gray-800 font-bold border-b-2 ${
              activeCategory === "거래 완료"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveCategory("거래 완료")}
          >
            거래 완료
          </button>
          <button
            id="받은 리뷰"
            className={`flex-grow h-12 mr-1.5 border-none bg-white text-gray-800 font-bold border-b-2 ${
              activeCategory === "받은 리뷰"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveCategory("받은 리뷰")}
          >
            받은 리뷰
          </button>
        </div>
        <div className="w-full mt-8">
          {activeCategory === "판매 물품" && <SelledItem />}
          {activeCategory === "관심 목록" && <CartPage />}
          {activeCategory === "거래 완료" && <EndDeal />}
          {activeCategory === "받은 리뷰" && <ReceiveReview />}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
