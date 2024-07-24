import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/thunkFunctions";

const ArticleInfo = ({ article }) => {
  const dispatch = useDispatch();
  const [remainTime, setRemainTime] = useState("");

  const handleClick = () => {
    dispatch(addToCart({ articleId: article.id }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const remainTime = calculateRemainTime(article.receptTime);
      setRemainTime(remainTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
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
    <div>
      <p>상품 정보</p>

      <ul>
        <li>{article.title}</li>
        <li>
          <span>인원: </span>
          {article.attend}명
        </li>
        <li>
          <span>수령 날짜 / 시간: </span>
          {article.receptTime}
        </li>
        <li>
          <span>남은 시간: </span>
          {remainTime}
        </li>
        <li>
          <span>수령 장소: </span>
          {article.place}
        </li>
        <li>
          <span>가격: </span>
          {article.price}원
        </li>
        <li>{article.content}</li>
      </ul>

      <div>
        <button onClick={handleClick}>
          {Math.floor(article.price / article.attend)}원으로 참여하기
        </button>
      </div>
    </div>
  );
};

export default ArticleInfo;
