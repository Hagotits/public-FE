import React, { useEffect, useState } from "react";
import "../style/Articles.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const Articles = () => {
  const [article, setArticle] = useState(null);
  const [remainTime, setRemainTime] = useState("");
  const { postId } = useParams();

  const fetchArticle = async () => {
    try {
      const response = await axiosInstance.get(`/articles/${postId}`);
      console.log(response.data);
      if (response.status === 200) {
        setArticle(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [postId]);

  useEffect(() => {
    if (article) {
      const interval = setInterval(() => {
        const remainTime = calculateRemainTime(article.receptTime);
        setRemainTime(remainTime);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [article]);

  const calculateRemainTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const timeDiff = end - now;
    if (timeDiff <= 0) {
      return "시간 종료";
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  };

  return (
    <div className="ArticlesPage">
      {article && (
        <div key={article.id} className="SUBDIV">
          <div className="IMG">
            {/* img파일도 axiosInstance로 해야하나? */}
            <img
              src={`http://localhost:4000/img/${article.img}`}
              alt={article.title}
            />
          </div>
          <div className="TEXT">
            <div className="USER">
              <div className="userIcon">(avatar)</div>
              <div className="userText">
                <div className="USERNAME">{article.userId}</div>
                <div className="TOWN">{article.place}</div>
              </div>
            </div>
            <div className="POST">
              <div className="TITLE">{article.title}</div>
              <div className="PRICE">{article.price}원</div>
              <div className="EXPLAN">{article.content}</div>
            </div>
          </div>
          <div className="LEFTOVER">
            <div className="GRAY">
              <div className="person">{article.attend}명 남음</div>
              <div className="time">{remainTime}</div>
            </div>
            <div className="BUTTON">
              <button className="BTN">
                {Math.floor(article.price / article.attend)}원으로 참여하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
