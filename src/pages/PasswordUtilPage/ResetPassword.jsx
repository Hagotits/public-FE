import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../style/Login.css";
import { useLocation } from "react-router-dom";
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
    minLenge: {
      value: 6,
      massage: "6자 이상 입력해주세요",
    },
  };

  const certPassword = {
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
              <div className="inputTitle">새 비밀번호</div>
              <div className="inputWirte">
                <input
                  type="password"
                  className="input"
                  {...register("newPassword", newPassword)}
                />
                {errors?.password && (
                  <div>
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">비밀번호 확인</div>
              <div className="inputWirte">
                <input
                  type="password"
                  className="input"
                  {...register("certPassword", certPassword)}
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
