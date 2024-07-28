import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import dayjs from "dayjs";

const CardItem = ({ product }) => {
  return (
    <div className="border-[1px] border-gray-300">
      <Link to={`/products/${product.id}`}>
        <div>
          <div className="image h-48 bg-gray-100">
            <ImageSlider images={product.images || []} />
          </div>
          <p className="p-1">{product.title}</p>
          <p className="p-1 text-xs text-gray-500">{product.price}원</p>
          <p className="p-1">{product.place}</p>
          <p className="p-1 text-xs text-gray-500">
            {product.attend - 1}명 남음
          </p>
          <p className="p-1 text-xs text-gray-500">
            {dayjs(product.receptTime).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      </Link>

      <div className="w-full mt-2.5">
        <button className="w-[50%] h-10 text-sm font-semibold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]">
          {product.price / product.attend}원으로 참여하기
        </button>
      </div>
    </div>
  );
};

export default CardItem;
