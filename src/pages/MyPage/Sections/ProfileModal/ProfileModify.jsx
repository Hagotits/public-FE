import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import PassWordChange from "./PasswordChange";
import axiosInstance from "../../../../utils/axios";
import { updateUser } from "../../../../redux/thunkFunctions";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

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

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user?.userData.name);
  const userAvatar = useSelector((state) => state.user?.userData?.avatar);

  // 상태 초기화
  const [name, setName] = useState(userName);
  const [image, setImage] = useState(
    userAvatar
      ? `http://localhost:4000/${userAvatar}`
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [passwordModal, setPasswordModal] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    setName(userName);
    setImage(
      userAvatar
        ? `http://localhost:4000/${userAvatar.replace(/(^"|"$)/g, "")}` // 큰따옴표 제거
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  }, [userName, userAvatar]);

  // 이미지 미리보기 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 미리보기 설정
      };
      reader.readAsDataURL(file);
    }
  };

  // 프로필 수정 함수
  const profileModify = async () => {
    const formData = new FormData();

    if (name) formData.append("name", name); // 이름 추가
    if (fileInput.current?.files[0])
      formData.append("avatar", fileInput.current.files[0]); // 이미지 파일 추가

    try {
      const response = await axiosInstance.patch(
        `users/mypage/update/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        updateUserData(response.data.user); // 상위 컴포넌트 상태 업데이트
        dispatch(updateUser(response.data.user)); // Redux 상태 업데이트
        setModifyModal(false); // 모달 닫기
        setImage(
          `http://localhost:4000/${response.data.user.avatar.replace(
            /(^"|"$)/g,
            ""
          )}`
        );
      }
      window.location.reload();
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    modifyModal && (
      <div>
        <div className="fixed left-0 inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[500px] h-[600px] p-16 rounded-lg shadow-xl flex flex-col">
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setModifyModal(false)}
            >
              ✕
            </button>

            {/* 프로필 수정 폼 */}
            <form
              onSubmit={handleSubmit(profileModify)} // profileModify 호출
              className="flex-1 flex flex-col"
            >
              {/* 프로필 이미지 업로드 */}
              <div className="flex flex-col items-center">
                <label className="text-[22px] font-semibold text-gray-800 mb-4">
                  프로필 수정
                </label>

                {/* 프로필 이미지 미리보기 */}
                <div className="relative mb-4">
                  <img
                    src={image} // 이미지 미리보기 URL
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover"
                    onClick={() => fileInput.current.click()}
                  />
                  <div
                    className="absolute w-10 h-10 bottom-0 right-0 text-gray-500 bg-gray-200 cursor-pointer grid place-items-center rounded-full"
                    onClick={() => fileInput.current.click()} // 카메라 아이콘 클릭
                  >
                    <FaCamera style={{ fontSize: "1.4rem" }} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleImageChange}
                  className="hidden"
                />
                {errors.avatar && (
                  <p className="text-sm text-red-500">
                    {errors.avatar.message}
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
                  value={name}
                  onChange={handleNameChange}
                  placeholder="새로운 사용자 이름을 입력하세요"
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

              {/* 버튼 섹션 */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="submit" // 버튼이 onClick 이벤트가 아니라 submit을 트리거
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
      </div>
    )
  );
};

export default ProfileModify;
