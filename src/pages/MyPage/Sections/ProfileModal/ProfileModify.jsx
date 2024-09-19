import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import PassWordChange from "./PasswordChange";
import axiosInstance from "../../../../utils/axios";
import { FaCamera } from "react-icons/fa";

const ProfileModify = ({
  modifyModal,
  setModifyModal,
  userId,
  updateUserData, // 상위 컴포넌트에서 받은 함수
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [passwordModal, setPasswordModal] = useState(false); // 비밀번호 변경 모달 상태
  const fileInputRef = useRef(null); // 파일 입력 참조

  // 프로필 수정 함수
  const profileModify = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name); // 이름 추가
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // 이미지 추가
    }

    try {
      const response = await axiosInstance.post(
        `users/mypage/update/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        updateUserData(response.data.user); // 수정된 사용자 정보를 상위 컴포넌트로 전달
        setModifyModal(false);
      }
    } catch (error) {
      console.error("프로필 수정 중 오류:", error);
    }
  };

  return (
    modifyModal && (
      <div>
        <div className="fixed left-0 inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[500px] h-[650px] p-16 rounded-lg shadow-xl flex flex-col">
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setModifyModal(false)}
            >
              ✕
            </button>

            {/* 프로필 수정 폼 */}
            <form
              onSubmit={handleSubmit(profileModify)}
              className="flex-1 flex flex-col">
              {/* 프로필 이미지 업로드 */}
              <div className="flex flex-col items-center">
                <label className="text-[22px] font-semibold text-gray-800 mb-4">
                  프로필 수정
                </label>
                <div className="relative w-32 h-32 bg-gray-300 rounded-full mt-4">
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                  )}
                  <img
                    // className="w-full h-full rounded-full bg-gray-200 object-cover"
                  />
                  <div
                    className="w-10 h-10 absolute bottom-0 right-0 text-gray-500 bg-gray-200 cursor-pointer grid place-items-center rounded-full"
                    onClick={() => fileInputRef.current.click()} // 카메라 아이콘 클릭하면 파일 선택하도록
                  >
                    <FaCamera style={{ fontSize: "1.4rem" }} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")} // 파일 업로드 필드 등록
                  className="hidden"
                  ref={fileInputRef} // 파일 입력 참조
                />
              </div>
              <div
                className="flex justify-end mb-7 text-[15px] text-gray-300 cursor-pointer"
                // onClick={} 클릭하면 현재 올라와있는 이미지 삭제시키기
              >
                프로필 이미지 삭제
              </div>

              {/* 사용자 이름 변경 */}
              <div className="grid grid-cols-[100px_1fr] items-center border-b-[1px] border-gray-300 py-3">
                <label className="text-base font-medium text-gray-800">
                  이름
                </label>
                <input
                  className="w-full text-sm font-normal text-gray-800 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="새로운 사용자 이름을 입력하세요"
                  {...register("name", { required: "이름을 입력해주세요." })} // 이름 필드 등록
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 변경 */}
              <div className="grid grid-cols-[100px_1fr] items-center border-b-[1px] border-gray-300 py-3">
                <label className="text-base font-medium text-gray-800">
                  비밀번호
                </label>
                <button
                  type="button"
                  className="ml-auto w-[80px] text-gray-700 px-4 py-2 rounded-[20px] hover:bg-gray-200"
                  onClick={() => setPasswordModal(true)}
                >
                  변경
                </button>
              </div>

              {/* 비밀번호 변경 모달 */}
              {passwordModal && (
                <PassWordChange
                  passwordModal={passwordModal}
                  setPasswordModal={setPasswordModal}
                />
              )}
            </form>

            {/* 버튼 섹션 */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="submit"
                className="bg-[#2B0585] text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                수정하기
              </button>
              <button
                type="button"
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={() => setModifyModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileModify;
