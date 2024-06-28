import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/thunkFunctions";
import "../style/Login.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, name, password }) => {
    const body = { email, name, password };
    try {
      await dispatch(registerUser(body));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };
  // const userAuNum = {
  //   required: "필수 필드입니다.",
  // };
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
    <div>
      <div className="SignUpPage">
        <div className="subdiv">
          <div className="title">Sign Up</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputTitle">EMAIL</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="text"
                    placeholder="이메일을 입력하세요."
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
                </div>
                {errors?.email && (
                  <div className="errMessage">
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="contentTitle">
              <div className="inputTitle">인증번호</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="input"
                    {...register("auNum", userAuNum)}
                  />
                </div>
                {errors?.auNum && (
                  <div className="errMessage">
                    <span>{errors.auNum.message}</span>
                  </div>
                )}
              </div>
            </div> */}

            <div className="contentTitle">
              <div className="inputTitle">NAME</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="input"
                    {...register("name", userName)}
                  />
                </div>
                {errors?.name && (
                  <div className="errMessage">
                    <span>{errors.name.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">PASSWORD</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="password"
                    className="input"
                    {...register("password", userPassword)}
                  />
                </div>
                {errors?.password && (
                  <div className="errMessage">
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="button">
              <button className="btn" type="submit">
                회원가입
              </button>
            </div>
          </form>
          <p className="user">
            아이디가 있다면?
            <a href="/login">로그인</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
