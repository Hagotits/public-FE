// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "../style/Fleamarket.css";

// const FleaMarket = () => {
//   const reduxItem = useSelector((state) => state.item);

//   const [item, setItem] = useState(null);

//   useEffect(() => {
//     if (reduxItem) {
//       fetchItem(reduxItem.id);
//     }
//   }, [reduxItem]);

//   const fetchItem = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/articles/${id}`);
//       setItem(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/Fleamarket.css";

const FleaMarket = () => {

  const handleSignUp = () => {
    navigate("/signup");
  };
  
  const handleWrite = () => {
    navigate("/write");
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = user?.userData?.name;

  useEffect(() => {
    if (!user?.userData) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user?.userData) {
    return null;
  }

  const Img = params.get("img");
  const title = params.get("title");
  const price = parseFloat(params.get("price"));
  const place = params.get("place");
  const attend = parseInt(params.get("attend"));
  const receptTime = params.get("receptTime");

  return (
    <div className="FleamarketPage">
      <div className="category">
          <button className="writeBtn" type="button" onClick={handleWrite}>
            글쓰기
          </button>
          <button className="modifyBtn" type="button" onClick={handleSignUp}>
            수정하기
          </button>
      </div>
      <div className="post">
        <div className="image">{Img}</div>
        <div className="text">
          <div className="Title">{title}</div>
          <div className="price">{price}</div>
          <div className="town">{place}원</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">{attend}</div>
            <div className="time">{receptTime}</div>
          </div>
          <div className="FleButton">
            <button className="FleBtn">
              {price / attend}원으로 참여하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleaMarket;