import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    console.log(email);
  }, [email]);

  const onSubmit = async ({ newPassword, certPassword }) => {
    try {
      const body = { email, newPassword, certPassword };

      const response = await axiosInstance.post("/auth/reset", body);
      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/login");
      } else {
        alert("사용자를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.log(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  const newPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "6자 이상 입력해주세요",
    },
  };

  const certPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "6자 이상 입력해주세요",
    },
  };

  return (
    <div className="w-full h-screen p-5 bg-white flex justify-center items-center">
      <div className="relative w-[500px] p-8 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col justify-center items-center">
        <div className="w-full mt-8 mb-16 text-2xl font-bold text-gray-900 text-center">
          새로운 비밀번호를 입력해주세요
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="relative w-full mt-4">
            <div className="relative w-full text-lg font-bold text-gray-900">
              새 비밀번호
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <input
                type="password"
                className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                {...register("newPassword", newPassword)}
              />
              {errors?.newPassword && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.newPassword.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full mt-4">
            <div className="relative w-full text-lg font-bold text-gray-900">
              비밀번호 확인
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <input
                type="password"
                className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                {...register("certPassword", certPassword)}
              />
              {errors?.certPassword && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.certPassword.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center mt-8">
            <button
              className="mt-8 mb-8 w-full h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
              type="submit"
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
