// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "../style/Articles.css";

// const Articles = () => {
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
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/Articles.css";
import axios from "axios"

const Articles = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = useSelector((state) => state.user?.userData.name);
  console.log(userName)

  
  const sendImg = async(body) => {
    try {
      // 맞는 사용자와(id) + 사용자가 올린 글 자체에서 img만 가져오기.
      const respone = await axios.get("https://localhost:4000/:name", {
        body
      })
      if(respone.data === 200) {
        return res.status("Good job")
      }
    } catch(err) {
      console.error(err)
    }
  } 
  

  const userId = params.get("userId");
  const Img = params.get("file");
  const title = params.get("title");
  const price = params.get("price");
  const place = params.get("place");
  const content = params.get("content");
  const attend = params.get("attend");
  const receptTime = params.get("receptTime");
  
  return (
    <div className="ArticlesPage">
      <div className="SUBDIV">
        <div className="IMG">{Img}</div>
        <div className="TEXT">
          <div className="USER">
            <div className="userIcon">(user 아이콘 들어갈 예정)</div>
            <div className="userText">
              <div className="USERNAME">{userName}</div>
              <div className="TOWN">{place}</div>
            </div>
          </div>
          <div className="POST">
            <div className="TITLE">{title}</div>
            <div className="PRICE">{price}원</div>
            <div className="EXPLAN">{content}</div>
          </div>
        </div>
        <div className="LEFTOVER">
          <div className="GRAY">
            <div className="person">{attend-1}명 남음</div>
            <div className="time">{receptTime}</div>
          </div>
          <div className="BUTTON">
            <button className="BTN">{price/attend}원으로 참여하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;