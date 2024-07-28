import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/thunkFunctions";

const ProductInfo = ({ product }) => {
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

      <div>
        <div>{product.title}</div>
        <div>
          <span>인원: </span>
          {product.attend}명
        </div>
        <div>
          <span>수령 날짜 / 시간: </span>
          {product.receptTime}
        </div>
        <div>
          <span>남은 시간: </span>
          {remainTime}
        </div>
        <div>
          <span>수령 장소: </span>
          {product.place}
        </div>
        <div>
          <span>가격: </span>
          {product.price}원
        </div>
        <div>{product.content}</div>
      </div>

      <div>
        <button onClick={handleClick}>
          {Math.floor(product.price / product.attend)}원으로 참여하기
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
