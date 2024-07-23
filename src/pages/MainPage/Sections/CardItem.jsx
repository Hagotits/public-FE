import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";

const CardItem = ({ article }) => {
  return (
    <div>
      <ImageSlider images={article.images || []} />
      <Link to={`/articles/${article.id}`}>
        <p>{article.title}</p>
        <p>{article.content}</p>
        <p>{article.price}원</p>
        {/* 썸네일나옴. 상품에 대한 대략적인 설명 */}
      </Link>
    </div>
  );
};

export default CardItem;
