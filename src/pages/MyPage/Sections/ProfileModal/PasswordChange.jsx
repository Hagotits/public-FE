import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../utils/axios"; // axiosInstance 경로 수정

const PassWordChange = ({ passwordModal, setPasswordModal, email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // 비밀번호 변경 함수
  const onSubmit = async ({ currentPassword, newPassword, certPassword }) => {
    if (newPassword !== certPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const body = { email, currentPassword, newPassword };

      const response = await axiosInstance.post("/auth/change-password", body);
      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setPasswordModal(false); // 비밀번호 변경 성공 시 모달 닫기
      } else {
        alert("사용자를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  const passwordValidation = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "6자 이상 입력해주세요",
    },
  };

  return (
    <div>
      {passwordModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="fixed bg-white w-[400px] h-[500px] p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="flex justify-center font-semibold text-[20px] py-4">
              비밀번호 변경
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 현재 비밀번호 입력 */}
              <div className="mb-4">
                <div>현재 비밀번호</div>
                <input
                  type="password"
                  className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400"
                  {...register("currentPassword", passwordValidation)}
                />
                {errors?.currentPassword && (
                  <div className="mt-1 text-red-500 text-sm">
                    <span>{errors.currentPassword.message}</span>
                  </div>
                )}
              </div>

              {/* 새 비밀번호 입력 */}
              <div className="mb-4">
                <div>새 비밀번호</div>
                <input
                  type="password"
                  className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400"
                  {...register("newPassword", passwordValidation)}
                />
                {errors?.newPassword && (
                  <div className="mt-1 text-red-500 text-sm">
                    <span>{errors.newPassword.message}</span>
                  </div>
                )}
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="mb-4">
                <div>새 비밀번호 확인</div>
                <input
                  type="password"
                  className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400"
                  {...register("certPassword", passwordValidation)}
                />
                {errors?.certPassword && (
                  <div className="mt-1 text-red-500 text-sm">
                    <span>{errors.certPassword.message}</span>
                  </div>
                )}
              </div>

              {/* 버튼 섹션 */}
              <div className="flex justify-end space-x-2">
                <button
                  className="text-white w-[30%] py-2 rounded bg-[#2B0585] hover:bg-gray-300"
                  type="submit"
                >
                  변경 저장
                </button>
                <button
                  className="text-black w-[20%] py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => {
                    setPasswordModal(false); // 모달 닫기
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassWordChange;
