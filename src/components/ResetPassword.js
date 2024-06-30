import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../style/Login.css";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const useSelector = useSelector((state) => state.auth.user);

  const onSubmit = async ({ password, newPassword }) => {
    const body = { password, newPassword };
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:4000/auth/update",
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  const userPassword = {
    required: "필수 필드입니다.",
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요",
    },
  };

  const userNewPassword = {
    required: "필수 필드입니다.",
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요",
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
