import React, { useContext } from "react";
import styled from "styled-components";
import axiosInstance from "../../utils/axios";
// import PayLogo from "./images/btn_send_regular.png";
// import { UserContext } from "../context/UserInfo";

const PayProduct = () => {
  // const context = useContext(UserContext);
  const { setPayUrl, payUrl } = context;

  const handlePayment1m = async () => {
    try {
      const response = await axiosInstance.post(
        "https://kapi.kakao.com/v1/payment/ready",
        {
          cid: "TC0ONETIME", // 가맹점 CID
          partner_order_id: "partner_order_id", // 가맹점 주문번호
          partner_user_id: "partner_user_id", // 가맹점 회원 ID
          item_name: "상품판매",
          quantity: 1,
          total_amount: 5500, // 결제 금액
          tax_free_amount: 0,
          approval_url: "http://localhost:3000/PayResult", // 성공 시
          cancel_url: "http://localhost:3000/kakaoPay", // 취소 시
          fail_url: "http://localhost:3000/kakaoPay", // 실패 시
        },
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_CREDIT_API}`, // Admin 키를 환경변수에서 가져옴
            "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
          },
        }
      );

      console.log(response.data);
      window.localStorage.setItem("tid", response.data.tid);
      setPayUrl(response.data.next_redirect_pc_url);
      window.location.href = response.data.next_redirect_pc_url; // 결제 페이지로 자동 이동
    } catch (error) {
      console.error("결제 요청 중 오류가 발생했습니다.", error);
      alert("결제 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <div className="wholeBody">
        <div className="partition1">
          <span>AEL이 준비한 특별한 선물</span>
          3개월 결제 시 20% 할인 이벤트
        </div>
        <div className="partition2" onMouseOver={handlePayment1m}>
          1개월 무제한 듣기
          <span>월 5,500원 </span>
          {/* <img src={PayLogo} alt="Pay with Kakao" /> */}
        </div>
      </div>
    </Container>
  );
};

export default PayProduct;
