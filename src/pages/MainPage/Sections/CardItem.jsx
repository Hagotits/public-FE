import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeCartItem } from "../../../redux/thunkFunctions"; // Import removeCartItem
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import ImageSlider from "../../../components/ImageSlider";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const CardItem = ({ product }) => {
  const dispatch = useDispatch();
  const [remainTime, setRemainTime] = useState("");
  const [like, setLike] = useState(false); //찜 상태 관리

  // Load the initial like state from localStorage
  useEffect(() => {
    const savedLikeState = localStorage.getItem(`like-${product.id}`);
    if (savedLikeState !== null) {
      setLike(JSON.parse(savedLikeState));
    }
  }, [product.id]);

  const handleClick = () => {
    dispatch(addToCart({ productId: product.id }));
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const toggleLike = () => {
    const newLikeState = !like;
    setLike(newLikeState);
    // Save the new like state to localStorage
    localStorage.setItem(`like-${product.id}`, JSON.stringify(newLikeState));
    if (newLikeState) {
      handleClick();
    } else {
      handleRemoveCartItem(product.id);
    }
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
        {days < 1
          ? `${hours}시간 ${minutes}분 ${seconds}초 남음`
          : `${days}일 남음`}
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
          className="w-[28px] h-[28px] absolute top-1 right-1 cursor-pointer"
          onClick={toggleLike} // Update this to use toggleLike directly
        >
          {like ? (
            <IoHeart style={{ width: "100%", height: "100%", color: "red" }} />
          ) : (
            <IoHeartOutline
              style={{ width: "100%", height: "100%", color: "white" }}
            />
          )}
        </div>
      </div>

      <Link to={`/products/${product.id}`}>
        <div>
          <p className="p-1 text-[18px]">{product.title}</p>
          <p className="p-1 text-[18px] text-black font-bold">
            {product.price / product.attend}원
          </p>
          <p className="p-1">{product.place}</p>
        </div>
        <div className="flex w-full mt-2.5">
          <div className="flex-1 flex-col justify-end text-right">
            <div className="flex p-1 items-center text-[14px] text-gray-500">
              <CiUser />
              <span className="text-red-500 font-medium ml-[2px]">
                {product.attend - 1}
              </span>
              <span>명</span>
              <span className="ml-[3px]">남음</span>
            </div>
            <div className="flex relative">
              <div className="flex p-1 items-center text-[14px] text-gray-500">
                <IoTimeOutline />
                <span className="ml-0.5">{remainTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;