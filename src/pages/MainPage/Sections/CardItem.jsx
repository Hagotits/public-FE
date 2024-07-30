import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import dayjs from "dayjs";
import { IoHeartOutline } from "react-icons/io5";
import duration from "dayjs/plugin/duration";
import { addToCart } from "../../../redux/thunkFunctions";
dayjs.extend(duration);

const CardItem = ({ product }) => {
  const dispatch = useDispatch();
  const [remainTime, setRemainTime] = useState("");

  const handleClick = () => {
    dispatch(addToCart({ productId: product.id }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const remainTime = calculateRemainTime(product.receptTime);
      setRemainTime(remainTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [product]);

  const calculateRemainTime = (endTime) => {
    const end = dayjs(endTime);
    const now = dayjs();

    const timeDiff = end.diff(now);
    if (timeDiff <= 0) {
      return "시간종료";
    }

    const duration = dayjs.duration(timeDiff);
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
  };


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
          <p className="p-1 text-[10px] text-gray-500">{remainTime}</p>
        </div>
        <button
          onClick={handleClick}
          className="w-[55%] h-10 text-xs font-semibold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
        >
          {product.price / product.attend}원으로 참여하기
        </button>
      </div>
    </div>
  );
};

export default CardItem;
