import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import dayjs from "dayjs";
import { IoHeartOutline } from "react-icons/io5";

const CardItem = ({ product }) => {
  return (
    <div className="rounded-[10px] border-[1px] border-gray-300 overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div>
          <div className="image h-48 bg-gray-100 overflow-hidden">
            <IoHeartOutline
              style={{
                width: "15%",
                height: "15%",
                color:"gray",
              }}
            />
            <ImageSlider images={product.images || []} />
          </div>
          <p className="p-1">{product.title}</p>
          <p className="p-1 text-xs text-gray-500">{product.price}원</p>
          <p className="p-1">{product.place}</p>
        </div>
      </Link>

      <div className="flex w-full mt-2.5">
        <div className="flex-1 flex-col justify-end text-right">
          <p className="p-1 text-[10px] text-gray-500">
            {product.attend - 1}명 남음
          </p>
          <p className="p-1 text-[10px] text-gray-500">
            {dayjs(product.receptTime).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
        <button className="w-[55%] h-10 text-xs font-semibold bg-[#2B0585] rounded-lg text-white hover:bg-[#8186CB]">
          {product.price / product.attend}원으로 참여하기
        </button>
      </div>
    </div>
  );
};

export default CardItem;
