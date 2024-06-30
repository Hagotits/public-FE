import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/thunkFunctions";
import "../style/Fleamarket.css";

const Fleamarket = () => {
  return (
    <div className="FleamarketPage">
      <div className="post"> 
        <div className="image"></div>
        <div className="text">
          <div className="Title">다이슨 드라이기 정품</div>
          <div className="price">100,000원</div>
          <div className="town">서울 강남구 도곡동</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">1명 남음</div>
            <div className="time">22:19:50</div>
          </div>
          <div className="Button">
            <button className="Btn">
              7000원으로 참여하기
            </button>
          </div>
        </div>
      </div>

      <div className="post"> 
        <div className="image"></div>
        <div className="text">
          <div className="Title">다이슨 드라이기 정품</div>
          <div className="price">100,000원</div>
          <div className="town">서울 강남구 도곡동</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">1명 남음</div>
            <div className="time">22:19:50</div>
          </div>
          <div className="Button">
            <button className="Btn">
              7000원으로 참여하기
            </button>
          </div>
        </div>
      </div>

      <div className="post"> 
        <div className="image"></div>
        <div className="text">
          <div className="Title">다이슨 드라이기 정품</div>
          <div className="price">100,000원</div>
          <div className="town">서울 강남구 도곡동</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">1명 남음</div>
            <div className="time">22:19:50</div>
          </div>
          <div className="Button">
            <button className="Btn">
              7000원으로 참여하기
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Fleamarket;
