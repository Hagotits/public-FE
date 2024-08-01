import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/thunkFunctions";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    const body = { email, password };
    try {
      dispatch(loginUser(body));
      navigate("/");
      reset();
      toast.info("로그인에 성공하였습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
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
          Login
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="relative w-full mt-4">
            <div className="relative w-full text-lg font-bold text-gray-900">
              EMAIL
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="text"
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  {...register("email", userEmail)}
                />
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
              PASSWORD
            </div>
            <div className="w-full rounded-lg mt-1.5 flex flex-col">
              <div className="relative w-full">
                <input
                  type="password"
                  className="relative w-full h-[45px] border border-gray-300 rounded-lg text-lg font-normal bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  {...register("password", userPassword)}
                />
                {errors?.password && (
                  <div className="mt-1 text-red-500 text-sm">
                    <span>{errors?.password.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="mt-12 mb-8 w-full h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
              type="submit"
            >
              로그인
            </button>
          </div>
        </form>
        <p className="text-center mb-5">
          아이디가 없다면?
          <a href="/signup" className="text-blue-500">
            {" "}
            회원가입
          </a>
        </p>
        <p className="text-center mb-7">
          <a href="/findPassword" className="text-blue-500">
            비밀번호 찾기
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
