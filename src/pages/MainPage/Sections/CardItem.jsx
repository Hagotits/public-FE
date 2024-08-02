import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/thunkFunctions";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import ImageSlider from "../../../components/ImageSlider";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const CardItem = ({ product }) => {
  const dispatch = useDispatch();
  const [remainTime, setRemainTime] = useState("");
  const [like, setLike] = useState(false); //찜 상태 관리

  const handleClick = () => {
    dispatch(addToCart({ productId: product.id }));
  };

  const toggleLike = () => {
    setLike(!like);
  };

  const handleIconClick = () => {
    handleClick();
    toggleLike(true);
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

    return (
      <div>
        {
        days < 1
          ? `${hours}시간 ${minutes}분 ${seconds}초 남음`
          : `${days}일 남음`
        
        }
      </div>
    );
  };

  return (
    <div className="rounded-[10px] border-[1px] border-gray-300 overflow-hidden">
      <div className="image h-48 bg-gray-100 overflow-hidden relative">
        <div>
          <ImageSlider images={product.images || []} />
        </div>
        <div
          className="w-[24px] h-[24px] absolute top-1 right-1 cursor-pointer"
          onClick={handleIconClick}
        >
          {like ? (
            <IoHeart style={{ width: "100%", height: "100%", color: "red" }} />
          ) : (
            <IoHeartOutline
              style={{ width: "100%", height: "100%", color: "grey" }}
            />
          )}
        </div>
      </div>

      <Link to={`/products/${product.id}`}>
        <div>
          <p className="p-1">{product.title}</p>
          <p className="p-1 text-s text-black font-bold">
            {product.price / product.attend}원
          </p>
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
      </div>
    </div>
  );
};

export default CardItem;
