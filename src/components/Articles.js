import React from "react";
import { useSelector } from "react-redux";
import "../style/Articles.css";
import axios from "axios";

const Articles = () => {
  const userId = useSelector((state) => state.user?.userData.id);
  console.log(userId);

  const sendImg = async (body) => {
    try {
      // 맞는 사용자와(id) + 사용자가 올린 글 자체에서 img만 가져오기.
      const respone = await axios.get("https://localhost:4000/:name", {
        body,
      });
      if (respone.data === 200) {
        return res.status("Good job");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
            <div className="person">{attend - 1}명 남음</div>
            <div className="time">{receptTime}</div>
          </div>
          <div className="BUTTON">
            <button className="BTN">{price / attend}원으로 참여하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
