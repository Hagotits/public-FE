import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/thunkFunctions";
import "../style/Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }) => {
    const body = { email, password };
    try {
      await dispatch(loginUser(body));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
    required: "필수 필드입니다.",
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요",
    },
  };

  return (
    <div>
      <div className="LoginPage">
        <div className="subdiv">
          <div className="title">Login</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputTitle">EMAIL</div>
              <div className="inputWirte">
<<<<<<< HEAD
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="input"
                    {...register("id", userId)}
                  />
                  {errors?.id && (
                    <div>
                      <span>{errors.id.message}</span>
                    </div>
                  )}
                </div>
=======
                <input
                  type="text"
                  className="input"
                  {...register("email", userEmail)}
                />
                {errors?.email && (
                  <div>
                    <span>{errors.email.message}</span>
                  </div>
                )}
>>>>>>> 468eda11a7fed5c981e2a2b553ca566777ea533e
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">PASSWORD</div>
              <div className="inputWirte">
                <div className="inputWrapper">
                  <input
                    type="password"
                    className="input"
                    {...register("password", userPassword)}
                  />
                  {errors?.password && (
                    <div>
                      <span>{errors?.password.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="button">
              <button className="btn">
                로그인
              </button>
            </div>
          </form>
          <p className="user">
            {""}아이디가 없다면?{""}
            <a href="/signup">회원가입</a>
          </p>
          <p className="find">
            <a href="/findId">아이디 찾기</a>
            <a href="/findPassword">비밀번호 찾기</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;