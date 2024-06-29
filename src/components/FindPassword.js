import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/thunkFunctions";
import "../style/Login.css";

const FindPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, auNum }) => {
    const body = { email, auNum };
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

  const userAuNum = {
    required: "필수 필드입니다.",
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요",
    },
  };

  return (
    <div>
      <div className="FindPasswordPage">
        <div className="subdiv">
          <div className="title">비밀번호 찾기</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputTitle">EMAIL</div>
              <div className="inputWirte">
                <div className="inputWrapper">
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
                  {errors?.auNum && (
                    <div>
                      <span>{errors?.auNum.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="button">
              <button className="btn" type="submit">
                비밀번호 찾기
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

export default FindPassword;
