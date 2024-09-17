import React, { useState } from "react";
import PassWordChange from "./PasswordChange";
import axiosInstance from "../../../../utils/axios";

const ProfileModify = ({
  modifyModal,
  setModifyModal,
  userId,
  toast,
  navigate,
}) => {
  const [passwordModal, setPasswordModal] = useState(false); // 비밀번호 변경 모달
  const [selectedFile, setSelectedFile] = useState(null); // 프로필 사진 파일
  const [userName, setUserName] = useState(""); // 사용자 이름

  // 프로필 수정 함수
  const profileModify = async () => {
    const formData = new FormData();
    formData.append("userName", userName);
    if (selectedFile) {
      formData.append("profileImage", selectedFile); // 프로필 사진 파일 추가
    }

    try {
      const response = await axiosInstance.post(
        `users/mypage/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        toast.info("프로필 수정이 완료되었습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("프로필 수정 중 오류:", error);
    }
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = () => {
    profileModify();
    setModifyModal(false);
  };

  return (
    <>
      {modifyModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[500px] h-[650px] p-16 rounded-lg shadow-xl flex flex-col justify-between">
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setModifyModal(false)}
            >
              ✕
            </button>

            {/* 프로필 이미지 업로드 */}
            <div className="flex flex-col items-center mb-6">
              <label className="text-lg font-semibold text-gray-800 mb-4">
                프로필 사진 변경
              </label>
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    사진 미리보기
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">
                  파일: {selectedFile.name}
                </p>
              )}
            </div>

            {/* 사용자 이름 변경 */}
            <div className="grid grid-cols-[100px_1fr] items-center border-b-[1px] border-gray-300 py-3">
              <label className="text-base font-medium text-gray-800">
                이름
              </label>
              <input
                className="w-full text-sm font-normal text-gray-800 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="새로운 사용자 이름을 입력하세요"
              />
            </div>

            {/* 비밀번호 변경 */}
            <div className="grid grid-cols-[100px_1fr] items-center border-b-[1px] border-gray-300 py-3">
              <label className="text-base font-medium text-gray-800">
                비밀번호
              </label>
              <button
                className="bg-[#2B0585] text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setPasswordModal(true)} // 비밀번호 변경 버튼 클릭시 모달 열기
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
                className="bg-[#2B0585] text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
              >
                수정하기
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={() => setModifyModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModify;
