import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/thunkFunctions";
import axiosInstance from "../../utils/axios";

const SignUp = () => {
  const [isAuth, setIsAuth] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ email, name, password }) => {
    const body = {
      email,
      name,
      password,
      avatar: `"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"`,
    };
    try {
      dispatch(registerUser(body));
      navigate("/login");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const sendAuNum = async (email) => {
    try {
      const response = await axiosInstance.post("/auth/verify", { email });
      if (response.status === 200) {
        alert("인증번호가 이메일로 전송되었습니다.");
      } else {
        alert("중복된 이메일입니다.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        alert("중복된 이메일입니다.");
      } else {
        alert("인증번호 전송에 실패했습니다.");
      }
    }
  };

  const certAuNum = async (authCode) => {
    try {
      const email = watch("email");
      const response = await axiosInstance.post("/auth/cert", {
        authCode,
        email,
      });
      if (response.status === 200) {
        alert("인증이 성공했습니다.");
        setIsAuth(true);
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
  const userName = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다.",
    },
  };

  return (
    <div className="w-full h-screen p-5 bg-white flex justify-center items-center">
      <div className="relative w-[500px] p-8 bg-white rounded-lg border border-gray-300 shadow-md flex justify-center items-center flex-col">
        <div
          id="회원가입"
          className="w-full mt-8 mb-16 text-2xl font-bold text-gray-900 text-center"
        >
          Sign Up
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="relative w-full mt-4">
            <div
              id="이메일"
              className="relative w-full text-lg font-bold text-gray-900"
            >
              EMAIL
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="이메일을 입력하세요."
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                  {...register("email", userEmail)}
                />
                <button
                  id="인증번호 전송"
                  type="button"
                  className="absolute right-1 top-[5px] h-[35px] border-none text-sm font-bold bg-[#2B0585] rounded-lg text-white px-2.5 hover:bg-[#8186CB]"
                  onClick={() => sendAuNum(watch("email"))}
                >
                  인증번호 전송
                </button>
              </div>
              {errors?.email && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full mt-4">
            <div
              id="인증번호"
              className="relative w-full text-lg font-bold text-gray-900 "
            >
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
                  id="인증번호 확인"
                  type="button"
                  className="absolute right-1 top-[5px] h-[35px] border-none text-sm font-bold bg-[#2B0585] rounded-lg text-white px-2.5 hover:bg-[#8186CB]"
                  onClick={() => certAuNum(watch("auNum"))}
                >
                  인증번호 확인
                </button>
              </div>
              {errors?.auNum && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.auNum.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full mt-4">
            <div
              id="이름"
              className="relative w-full text-lg font-bold text-gray-900"
            >
              NAME
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="text"
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                  {...register("name", userName)}
                />
              </div>
              {errors?.name && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.name.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full mt-4">
            <div
              id="비밀번호"
              className="relative w-full text-lg font-bold text-gray-900"
            >
              PASSWORD
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="password"
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 pl-2"
                  {...register("password", userPassword)}
                />
              </div>
              {errors?.password && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              id="회원가입"
              className="mt-12 mb-8 w-full h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
              type="submit"
            >
              회원가입
            </button>
          </div>
        </form>
        <p className="text-center mb-5">
          아이디가 있다면?
          <a href="/login" className="text-blue-500">
            {" "}
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
