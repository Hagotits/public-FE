import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

const ReceiveReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch received reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/users/mypage/reviews");
        setReviews(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="text-center m-7">
      <h2 className="text-xl font-bold mb-5">받은 거래후기</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <p className="font-semibold">
                  거래일자: {review.transactionDate}
                </p>
                <p className="font-semibold">판매자: {review.sellerName}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <p className="font-semibold">상품명: {review.productName}</p>
                {review.productImage && (
                  <img
                    src={`http://localhost:4000/${review.productImage}`}
                    alt={review.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <p className="font-semibold">
                  나의 구매가격: {formatPrice(review.price)} 원
                </p>
                <p className="font-semibold">수량: {review.quantity}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <p className="font-semibold">별점: {review.rating}점</p>
                <p className="font-semibold">후기: {review.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>받은 후기가 없습니다.</p>
      )}
    </div>
  );
};

export default ReceiveReview;
