import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/thunkFunctions";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axiosInstance from "../../../utils/axios";
dayjs.extend(duration);

const ProductInfo = ({ product }) => {
  const userId = useSelector((state) => state.user?.userData.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [remainTime, setRemainTime] = useState("");
  const [like, setLike] = useState(false); //찜 상태 관리

  // 저장
  useEffect(() => {
    const savedLikeState = localStorage.getItem(`like-${userId}-${product.id}`);
    if (savedLikeState !== null) {
      setLike(JSON.parse(savedLikeState));
      // parse는 적절한 객체로 바꿔주는 함수..(bool값이니까 true/false로 나타냄)
    }
  }, [product.id, userId]);

  // 삭제
  const toggleLike = () => {
    if (userId === product.userId) {
      alert("본인의 상품은 찜할 수 없습니다.");
      return;
    }

    const state = !like; // 반전시킴
    setLike(state);
    localStorage.setItem(`like-${userId}-${product.id}`, JSON.stringify(state));

    if (state) {
      dispatch(addToCart({ productId: product.id }));
    } else {
      dispatch(removeCartItem(product.id));
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
      return "시간 종료";
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
  // console.log(product)

  // 금액 1000원 단위로 , 나타나도록
  const Price = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 게시글 삭제
  const Delete = async () => {
    if (window.confirm("해당 게시글을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.")) {
      try {
        const response = await axiosInstance.delete(`/products/${product.id}`, {
          params: { userId: userId },
        });
        if (response.status === 200) {
          alert("삭제되었습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("게시글 삭제 중 오류가 발생했습니다:", error);
        alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  // 게시글 수정
  const Edit = async () => {
    navigate(`/edit/${product.id}`, { state: { product } });
  };

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
          <div id="거래 장소" className="text-[14px]">
            {product.places}
            <div className="flex absolute right-1">
              <div className="flex items-center space-x-1 text-gray-500">
                <button className="flex" onClick={Edit}>
                  수정 /
                </button>
                <button className="flex" onClick={Delete}>
                  삭제
                </button>
              </div>
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
          {Price(product.price)}원
        </div>
        <div id="설명" className="text-[16px]">
          {product.content}
        </div>
      </div>

      <div className="relative flex justify-end flex-row items-end mt-[50px]">
        <div id="회색글씨" className="flex flex-col items-end mr-[10px]">
          <div id="남은 인원" className="text-[12px] text-[rgb(182, 182, 182)]">
            {product.attend - 1}명 남음
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
            onClick={toggleLike}
          >
            {Price(Math.floor(product.price / product.attend))}원으로 참여하기
          </button>
          <div
            className="w-[28px] h-[28px] absolute top-[7px] left-[57%] cursor-pointer"
            onClick={toggleLike}
          >
            {like ? (
              <IoHeart
                style={{ width: "100%", height: "100%", color: "red" }}
              />
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
