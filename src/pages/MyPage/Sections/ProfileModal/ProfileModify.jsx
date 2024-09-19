import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import PassWordChange from "./PasswordChange";
import axiosInstance from "../../../../utils/axios";

const ProfileModify = ({
  modifyModal,
  setModifyModal,
  userId,
  updateUserData, // 상위 컴포넌트에서 받은 함수
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [passwordModal, setPasswordModal] = useState(false); // 비밀번호 변경 모달 상태
  const [imagePreview, setImagePreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [name, setName] = useState(null);
  const fileInput = useRef(null);

  // 이미지 미리보기 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    }
  };

  // 프로필 수정 함수
  const profileModify = async () => {
    const formData = new FormData();

    // 이름이 있을 경우에만 추가
    if (name) {
      formData.append("name", name);
    }

    // 이미지 파일이 있을 경우에만 추가
    if (fileInput.current && fileInput.current.files[1]) {
      formData.append("avatar", fileInput.current.files[1]);
    }

    // formData 확인 로그
    console.log([...formData.entries()]);

    try {
      const response = await axiosInstance.post(
        `users/mypage/update/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        updateUserData(response.data.user); // 수정된 사용자 정보를 상위 컴포넌트로 전달
        setModifyModal(false); // 모달 닫기
      }
    } catch (error) {
      console.error(
        "프로필 수정 중 오류: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    modifyModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white w-[500px] h-[550px] p-16 rounded-lg shadow-xl flex flex-col justify-between">
          {/* 닫기 버튼 */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={() => setModifyModal(false)}
          >
            ✕
          </button>

          {/* 프로필 이미지 미리보기 */}
          <div className="flex justify-center mb-4">
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover"
              onClick={() => fileInput.current.click()}
            />
          </div>

          {/* 프로필 수정 폼 */}
          <form onSubmit={handleSubmit(profileModify)}>
            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center mb-6">
              <label className="text-lg font-semibold text-gray-800 mb-4">
                프로필 사진 변경
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleImageChange}
                className="hidden"
              />
              {errors.avatar && (
                <p className="text-sm text-red-500">{errors.avatar.message}</p>
              )}
            </div>

            {/* 사용자 이름 변경 */}
            <div className="grid grid-cols-[100px_1fr] items-center border-b-[1px] border-gray-300 py-3">
              <label className="text-base font-medium text-gray-800">
                이름
              </label>
              <input
                className="w-full text-sm font-normal text-gray-800 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="새로운 사용자 이름을 입력하세요"
                onChange={handleNameChange}
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
                className="bg-[#2B0585] text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
          </form>
        </div>
      </div>
    )
  );
};

export default ProfileModify;
