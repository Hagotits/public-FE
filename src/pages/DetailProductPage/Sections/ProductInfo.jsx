import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/thunkFunctions";
import dayjs from "dayjs";


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
  // console.log(product)

  return (
    <div>
      <div
        id="글쓴 회원 정보"
        className="w-full h-[100px] border-b border-gray-500 relative flex py-[10px]"
      >
        <div
          id="프로필 이미지"
          className="w-[80px] h-full rounded-full border-2 border-[#c1c1c1]"
        ></div>
        <div className="h-full flex flex-col justify-center items-start ml-[20px]">
          <div id="닉네임" className="mb-[5px]">
            {product.userName}
          </div>
          <div id="거래 장소">{product.places}</div>
        </div>
      </div>

      <div>
        <div
          id="제목"
          className="w-full h-[50px] text-[25px] font-normal mt-[30px] mb-[10px]"
        >
          {product.title}
        </div>
        <div
          id="가격"
          className="w-full h-[40px] text-[20px] font-bold mb-[10px]"
        >
          {product.price}원
        </div>
        <div id="설명" className="text-[16px]">
          {product.content}
        </div>
      </div>

      <div className="relative flex justify-end flex-row items-end mt-[50px]">
        <div id="회색글씨" className="flex flex-col items-end mr-[10px]">
          <div
            id="남은 인원"
            className="text-[12px] text-[rgb(182, 182, 182)]"
          >
            {product.attend - 1}명 남음
          </div>
          <div
            id="남은 시간"
            className="text-[12px] text-[rgb(182, 182, 182)] mt-[3px]"
          >
            {dayjs(product.remainTime).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
        <button
          id="참여 버튼"
          className="w-[200px] h-10 text-[14px] font-semibold bg-purple-800 rounded-md text-white hover:bg-puple-400"
          onClick={handleClick}
        >
          {Math.floor(product.price / product.attend)}원으로 참여하기
        </button>
        <button
          onClick={handleClick}
          className="w-[200px] h-10 text-[14px] font-semibold border border-gray-900">
            찜하기
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
