import React from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/thunkFunctions"
import "../style/Login.css";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ password, newPassword }) => {
    const body = { password, newPassword };
    try {
      await dispatch(loginUser(body));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const userPassword = {
    required: "필수 필드입니다.",
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요"
    },
  };

  const userNewPassword = {
    required: "필수 필드입니다.",
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요"
    },
  };

  return (
    <div>
      <div className="ResetPasswordPage">
        <div className="subdiv">
          <div className="title">새로운 비밀번호를 입력해주세요</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputTitle">PASSWORD</div>
              <div className="inputWirte">
                <input
                  type="password"
                  className="input"
                  {...register("password", userPassword)}
                />
                {errors?.password && (
                  <div>
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">NEW PASSWORD</div>
              <div className="inputWirte">
                <input
                  type="newPassword"
                  className="input"
                  {...register("newPassword", userNewPassword)}
                />
                {errors?.newPassword && (
                  <div>
                    <span>{errors?.newPassword.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="button">
              <button className="btn" type="submit">
                비밀번호 변경
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;