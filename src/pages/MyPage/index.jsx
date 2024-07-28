import React, { useState } from "react";
import CartPage from "../CartPage/index";
import SelledItem from "./Sections/SelledItem";
import EndDeal from "./Sections/EndDeal";
import Review from "./Sections/Review";

const MyPage = () => {
  const [activeCategory, setActiveCategory] = useState("판매 물품");

  return (
    <div
      id="전체"
      className="w-full h-screen bg-white flex justify-center items-center"
    >
      <div className="w-full h-full bg-white">
        <div
          id="프로필 & 수정 & 탈퇴"
          className="w-full h-15 shadow-md flex items-center"
        >
          <div
            id="프로필 사진"
            className="w-24 h-24 object-cover border-2 border-gray-300 rounded-full mx-14 block"
          />
          <div className="w-4/5">
            <div id="회원 이름" className="w-full h-1/2 mb-1 text-lg my-10">
              하가형
            </div>
            <div className="w-full h-1/2">
              <button
                id="프로필 수정"
                className="w-24 h-8 mr-5 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200"
              >
                프로필 수정
              </button>
              <button
                id="회원 탈퇴"
                className="w-24 h-8 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200 mb-16"
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
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
            id="거래 후기"
            className={`flex-grow h-12 mr-1.5 border-none bg-white text-gray-800 font-bold border-b-2 ${
              activeCategory === "거래 후기"
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveCategory("거래 후기")}
          >
            거래 후기
          </button>
        </div>
        <div className="w-full mt-8">
          {activeCategory === "판매 물품" && <SelledItem>판매 물품</SelledItem>}
          {activeCategory === "관심 목록" && <CartPage />}
          {activeCategory === "거래 완료" && <EndDeal>거래 완료</EndDeal>}
          {activeCategory === "거래 후기" && <Review>거래 후기</Review>}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
