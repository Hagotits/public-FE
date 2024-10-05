import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../../../redux/thunkFunctions";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axiosInstance from "../../../utils/axios";
import Modal from "./Modal";
import PopularityPost from "./PopularityPost";
import PayLogo from "../images/btn_send_regular.png";
import QandA from "./QandA";
import PushNotification from "../../../components/PushNotification";
dayjs.extend(duration);

const ProductInfo = ({ product }) => {
  const { fireNotificationWithTimeout } = PushNotification(); // 알림 초기화
  const user = useSelector((state) => state.user?.userData);
  const userId = useSelector((state) => state.user?.userData.id);
  const userAvatar = useSelector((state) => state.user?.userData?.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [remainTime, setRemainTime] = useState("");
  const [like, setLike] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 이미지 경로 형식 지정
  const formatAvatarUrl = (avatar) => {
    if (!avatar) {
      // 기본 이미지 URL 설정
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }
    return avatar.startsWith('"') && avatar.endsWith('"')
      ? `http://localhost:4000/${avatar.replace(/(^"|"$)/g, "")}`
      : `http://localhost:4000/${avatar}`;
  };

  useEffect(() => {
    const savedLikeState = localStorage.getItem(`like-${userId}-${product.id}`);
    if (savedLikeState !== null) {
      setLike(JSON.parse(savedLikeState));
    }
  }, [product.id, userId]);

  const toggleLike = () => {
    if (userId === product.userId) {
      setAlertModal(true);
      return;
    }

    const state = !like;
    setLike(state);
    localStorage.setItem(`like-${userId}-${product.id}`, JSON.stringify(state));

    if (state) {
      dispatch(addToCart({ productId: product.id }));

      fireNotificationWithTimeout(
        `${product.title}을(를) 좋아요 하였습니다.`,
        5000,
        {
          body: `${user.name}: 제품을 좋아요 했습니다!`,
        }
      );
    } else {
      dispatch(removeCartItem(product.id));
      fireNotificationWithTimeout(
        `${product.title}을(를) 좋아요를 취소 하였습니다.`,
        5000,
        {
          body: `${user.name}: 제품을 좋아요를 취소 했습니다!`,
        }
      );
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

  const Price = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const Delete = async () => {
    try {
      if (product.userId === userId) {
        const response = await axiosInstance.delete(`/products/${product.id}`, {
          params: { userId: userId },
        });
        if (response.status === 200) {
          setDeleteSuccessModal(true);
          // fireNotificationWithTimeout("성공적으로 상품이 삭제되었습니다.", 5000, {
          //   body: `${}: ${}`,
          // });
        }
      } else {
        // alert("본인의 게시글만 삭제할 수 있습니다.");
        setAlertMessage("본인의 게시글만 삭제할 수 있습니다.");
        setAlertModal(true);
        // fireNotificationWithTimeout("알림", 5000, {
        //   body: "본인의 게시글만 삭제할 수 있습니다.",
        // });
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류가 발생했습니다: ", error);
      alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  const Edit = async () => {
    try {
      if (product.userId === userId) {
        navigate(`/edit/${product.id}`, { state: { product } });
        pushNotification.fireNotificationWithTimeout("게시글 수정", 5000, {
          body: "게시글 수정 페이지로 이동합니다.",
        });
      } else {
        // alert("본인의 게시글만 수정할 수 있습니다.");
        setAlertMessage("본인의 게시글만 수정할 수 있습니다.");
        setAlertModal(true);
        // fireNotificationWithTimeout("알림", 5000, {
        //   body: "본인의 게시글만 수정할 수 있습니다.",
        // });
      }
    } catch (err) {
      console.error("게시 수정 중 오류가 발생했습니다: ", err);
    }
  };

  const handlePayment = () => {
    window.location.href = "https://link.kakaopay.com/_/w4VaY4B";
  };

  return (
    <div>
      <div
        id="글쓴 회원 정보"
        className="w-full h-[100px] border-b border-gray-300 relative flex py-[10px] items-center"
      >
        {/* 유저 아바타 이미지 표시 */}
        <img
          id="프로필 이미지"
          className="w-[60px] h-[60px] rounded-full "
          src={formatAvatarUrl(userAvatar)}
          alt="User Avatar"
        />

        <div className="h-full flex flex-col justify-center items-start ml-[20px]">
          <div id="닉네임" className="text-[16px] font-semibold mb-[5px]">
            {product.userName}
          </div>
          <div id="거래 장소" className="text-[14px]">
            {product.places}
            <div
              className="w-[28px] h-[28px] absolute top-[26px] left-[95%] cursor-pointer"
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
            <div className="flex absolute right-1">
              <div className="flex items-center space-x-1 text-gray-500">
                <button className="flex" onClick={Edit}>
                  수정 /
                </button>
                <button
                  className="flex justify-center"
                  onClick={() => setDeleteModal(true)}
                >
                  삭제
                </button>
              </div>

              <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={Delete}
                title="해당 게시글을 삭제하시겠습니까?"
                message="삭제된 데이터는 복구할 수 없습니다."
              />

              <Modal
                isOpen={deleteSuccessModal}
                onClose={() => {
                  setDeleteSuccessModal(false);
                  navigate("/");
                }}
                title="성공적으로 삭제되었습니다."
                message=""
                confirmText="확인"
              />

              <Modal
                isOpen={alertModal}
                onClose={() => setAlertModal(false)}
                title="오류"
                message={alertMessage}
                confirmText="확인"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray-300 py-[40px]">
        <div
          id="제목"
          className="w-full h-[50px] text-[23px] font-normal mb-[10px]"
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

        <div className="relative flex justify-end flex-row items-end mt-[50px]">
          <div id="회색글씨" className="flex flex-col items-end mr-[10px]">
            <div
              id="남은 인원"
              className="text-[14px] text-[rgb(182, 182, 182)]"
            >
              {product.attend - 1}명 남음
            </div>
            <div
              id="남은 시간"
              className="text-[14px] text-[rgb(182, 182, 182)] mt-[3px]"
            >
              {remainTime}
            </div>
          </div>
          <div>
            <button
              id="참여 버튼"
              className=""
              onClick={handlePayment} // 결제 페이지로 이동
            >
              <img src={PayLogo} alt="카카오페이 송금" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <QandA />
      </div>
      <div>
        <PopularityPost />
      </div>
    </div>
  );
};

export default ProductInfo;
