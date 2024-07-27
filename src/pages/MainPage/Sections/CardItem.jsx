import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import dayjs from "dayjs";

const CardItem = ({ article }) => {
  console.log(article.id);
  return (
    <div className="border-[1px] border-gray-300">
      <div className="image h-48 bg-gray-100">
        <ImageSlider images={article.images || []} />
      </div>
      <Link to={`/articles/${article.id}`}>
        <div>
          <p className="p-1">{article.title}</p>
          <p className="p-1 text-xs text-gray-500">{article.price}원</p>
          <p className="p-1">{article.place}</p>
          <p className="p-1 text-xs text-gray-500">
            {article.attend - 1}명 남음
          </p>
          <p className="p-1 text-xs text-gray-500">
            {dayjs(article.receptTime).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      </Link>

      <div className="w-full mt-2.5">
        <button className="w-[50%] h-10 text-sm font-semibold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]">
          {article.price / article.attend}원으로 참여하기
        </button>
      </div>
    </div>
  );
};

export default CardItem;
