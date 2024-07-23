import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/thunkFunctions";

const ArticleInfo = ({ article }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ articleId: article._id }));
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
          {article.date}
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
          {article.price / article.attend}로 참여하기
        </button>
      </div>
    </div>
  );
};

export default ArticleInfo;
