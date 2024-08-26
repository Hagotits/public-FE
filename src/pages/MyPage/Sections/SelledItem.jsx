import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const SelledItem = () => {
  const userId = useSelector((state) => state.user?.userData?.id);
  const [product, setProduct] = useState([]);
  const [remainTime, setRemainTime] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/mypage/sale/${userId}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (product.length > 0) {
        const updatedRemainTime = product.map((item) => ({
          id: item.id,
          remainTime: calculateRemainTime(item.receptTime),
        }));
        setRemainTime(updatedRemainTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [product]);

  const Price = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
    return days < 1
      ? `${hours}시간 ${minutes}분 ${seconds}초 남음`
      : `${days}일 남음`;
  };

  return (
    <div className="max-w-screen-sm mx-auto p-5">
      {product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.map((item) => {
            // Find the remaining time for the current item
            const itemRemainTime =
              remainTime.find((rt) => rt.id === item.id)?.remainTime || "";

            return (
              <div
                key={item.id}
                className="bg-white border rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/products/${item.id}`}>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={`http://localhost:4000/${item.images[0]}`}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg mb-4">
                      <IoTimeOutline size={50} className="text-gray-500" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-red-500 font-bold mb-3">
                    {Price(item.price / item.attend)} 원
                  </p>
                  <p className="text-gray-700 text-sm mb-2">{item.content}</p>
                  <p className="text-gray-600 text-xs mb-1">{item.places}</p>
                  <p className="text-gray-600 text-xs mb-1">
                    참여 인원: {item.attend - 1}
                  </p>
                  {item.soldOut ||
                  (remainTime.find((rt) => rt.id === item.id)?.remainTime ===
                    "시간종료" &&
                    item.soldOut === false) ? (
                    "안팔림"
                  ) : (
                    <p>{itemRemainTime}</p>
                  )}
                  <p
                    className={`font-semibold ${
                      item.soldOut ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.soldOut === true ? "판매완료" : "판매 중"}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>상품이 없습니다.</p>
      )}
    </div>
  );
};

export default SelledItem;
