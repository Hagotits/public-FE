import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

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
    <div className="w-full h-screen p-5 bg-white flex justify-center items-center">
      <div className="relative w-[500px] p-8 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col justify-center items-center">
        <div className="w-full mt-8 mb-16 text-2xl font-bold text-gray-900 text-center">
          비밀번호 찾기
        </div>
        <form onSubmit={handleSubmit(certAuNum)} className="w-full">
          <div className="relative w-full mt-4">
            <div className="relative w-full text-lg font-bold text-gray-900">
              EMAIL
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="text"
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                  {...register("email", userEmail)}
                />
                <button
                  type="button"
                  className="absolute right-1 top-[5px] h-[35px] border-none text-sm font-bold bg-[#2B0585] rounded-lg text-white px-2.5 hover:bg-[#8186CB]"
                  onClick={() => sendAuNum(watch("email"))}
                >
                  인증번호 전송
                </button>
                {errors?.email && (
                  <div className="mt-1 text-red-500 text-sm">
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative w-full mt-4">
            <div className="relative w-full text-lg font-bold text-gray-900">
              인증번호
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="text"
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                  {...register("auNum", userAuNum)}
                />
                <button
                  type="button"
                  className="absolute right-1 top-[5px] h-[35px] border-none text-sm font-bold bg-[#2B0585] rounded-lg text-white px-2.5 hover:bg-[#8186CB]"
                  onClick={() => certAuNum(watch("auNum"))}
                >
                  인증번호 확인
                </button>
                {errors?.auNum && (
                  <div className="mt-1 text-red-500 text-sm">
                    <span>{errors.auNum.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <br />
        <p className="text-center mb-5">
          아이디가 없다면?
          <a href="/signup" className="text-blue-500">
            {" "}
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

export default FindPassword;
