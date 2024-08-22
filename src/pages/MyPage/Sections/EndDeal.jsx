import React from "react";
import { useDispatch, useSelector } from "react-redux";

const EndDeal = () => {
  return (
    <div className="text-center m-7">
      <div className="text-left flex">
        <p className="mx-3">구매자</p>
        <p className="mx-3">판매자</p>
        <p className="mx-3">참여인원</p>
        <p className="mx-3">가격</p>
        <p className="mx-3">장소</p>
        <p className="mx-3">수정</p>
        <p className="mx-3">삭제</p>
        <p className="mx-3">리뷰쓰기</p>
      </div>
    </div>
  );
};

export default EndDeal;
