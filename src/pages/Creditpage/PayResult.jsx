import React, { useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useLocation } from "react-router-dom";

const PayResult = () => {
  const location = useLocation();
  const url = location.search;
  const pgToken = new URLSearchParams(url).get("pg_token");

  useEffect(() => {
    const handleApprove = async () => {
      try {
        const response = await axiosInstance.post(
          "https://kapi.kakao.com/v1/payment/approve",
          {
            cid: "TC0ONETIME", // 가맹점 CID
            tid: window.localStorage.getItem("tid"),
            partner_order_id: "partner_order_id", // 가맹점 주문번호
            partner_user_id: "partner_user_id", // 가맹점 회원 ID
            pg_token: pgToken,
          },
          {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_CREDIT_API}`,
              "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
            },
          }
        );
        console.log(response.data);
        alert("결제가 완료되었습니다.");
        window.close(); // 결제 완료 후 창 닫기
      } catch (error) {
        console.error("결제 승인 중 오류가 발생했습니다.", error);
        alert("결제 승인에 실패했습니다.");
      }
    };

    if (pgToken) {
      handleApprove();
    }
  }, [pgToken]);

  return (
    <div>
      <p>결제 처리 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
};

export default PayResult;
