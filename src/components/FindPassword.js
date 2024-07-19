import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import axiosInstance from "../utils/axios";

const FindPassword = () => {
  const [email, setEmail] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const sendAuNum = async (email) => {
    try {
      const response = await axiosInstance.post("/find/password", {
        email,
      });
      setEmail(email);
      console.log(email);
      if (response.data) {
        alert("인증번호가 이메일로 전송되었습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("인증번호 전송에 실패했습니다.");
    }
  };

  const certAuNum = async (authCode) => {
    try {
      const response = await axiosInstance.post("/find/password/cert", {
        authCode,
        email,
      });
      if (response.status === 200) {
        alert("인증이 성공했습니다.");
        navigate("/reset", { state: { email: email } });
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };

  const userAuNum = {
    required: "필수 필드입니다.",
  };

  return (
    <div>
      <div className="FindPasswordPage">
        <div className="subdiv">
          <div className="title">비밀번호 찾기</div>
          <form onSubmit={handleSubmit(certAuNum)}>
            <div className="contentTitle">
              <div className="inputTitle">EMAIL</div>
              <div className="inputWirte">
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="input"
                    {...register("email", userEmail)}
                  />
                  <button
                    type="button"
                    className="sendAuNumBtn"
                    onClick={() => sendAuNum(watch("email"))}
                  >
                    인증번호 전송
                  </button>
                  {errors?.email && (
                    <div>
                      <span>{errors.email.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">인증번호</div>
              <div className="inputWirte">
                <div className="inputWrapper">
                  <input
                    type="auNum"
                    className="input"
                    {...register("auNum", userAuNum)}
                  />
                  <button
                    type="button"
                    className="sendAuNumBtn"
                    onClick={() => certAuNum(watch("auNum"))}
                  >
                    인증번호 확인
                  </button>
                  {errors?.auNum && (
                    <div>
                      <span>{errors?.auNum.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <p className="user">
            {""}아이디가 없다면?{""}
            <a href="/signup">회원가입</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
