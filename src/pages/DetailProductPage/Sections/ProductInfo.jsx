import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/thunkFunctions";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const ProductInfo = ({ product }) => {
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
      return "시간 종료";
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
  // console.log(product)

  return (
    <div>
      <div
        id="글쓴 회원 정보"
        className="w-full h-[100px] border-b border-gray-500 relative flex py-[10px] items-center"
      >
        <div
          id="프로필 이미지"
          className="w-[60px] h-[60px] rounded-full border-2 border-[#c1c1c1]"
        ></div>
        <div className="h-full flex flex-col justify-center items-start ml-[20px]">
          <div id="닉네임" className="text-[16px] font-semibold mb-[5px]">
            {product.userName}
          </div>
          <div id="거래 장소" className="text-[14px]">{product.places}
            <div className="">
              {/* <button className="absolute right-1">수정 / 삭제</button> */}
              <button className="flex absolute right-1">
                <div className="flex items-center space-x-1 text-gray-500">
                  <div className="flex">수정 /</div>
                  <div className="flex">삭제</div>
                </div>
              </button>
              {/* <button className="flex flex-row absolute right-1 space-x-3">
                <div className="flex">수정</div>
                <div className="flex">삭제</div>
              </button> */}
            </div>
          </div>

        </div>
      </div>

      <div>
        <div
          id="제목"
          className="w-full h-[50px] text-[23px] font-normal mt-[30px] mb-[10px]"
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
          <div id="남은 인원" className="text-[12px] text-[rgb(182, 182, 182)]">
            {product.attend -1}명 남음
          </div>
          <div
            id="남은 시간"
            className="text-[12px] text-[rgb(182, 182, 182)] mt-[3px]"
          >
            {remainTime}
          </div>
        </div>
        <div>
          <button
            id="참여 버튼"
            className="w-[200px] h-10 text-[14px] font-semibold bg-[#2B0585] rounded-md text-white hover:bg-puple-400"
            onClick={handleClick}
          >
            {Math.floor(product.price / product.attend)}원으로 참여하기
          </button>
          <div
            className="w-[28px] h-[28px] absolute top-[7px] left-[57%] cursor-pointer"
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
      </div>
    </div>
  );
};

export default ProductInfo;
