import React, { useState } from "react";
import PassWordChange from "./PasswordChange";

const ProfileModify = ({
  modifyModal,
  setModifyModal,
  userId,
  axiosInstance,
  toast,
  navigate,
}) => {
  const [passwordModal, setPasswordModal] = useState(false); // 비밀번호 변경 모달

  const profileModify = async () => {
    try {
      const response = await axiosInstance.post(`users/mypage/${userId}`);
      if (response.status === 200) {
        console.log("프로필 수정 완료", response.data);
        toast.info("프로필 수정이 완료되었습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      { modifyModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="fixed bg-white w-[500px] h-[500px] p-4 rounded-lg shadow-lg flex flex-col justify-between">

            <div className="grid grid-cols-[100px_1fr] items-center border-y-[1px] border-gray-200">
              <div className="text-base font-medium text-left py-5 pl-2 pr-2.5">
                userName
              </div>
              <input className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"></input>
            </div>

            <div className="grid grid-cols-[100px_1fr] items-center border-y-[1px] border-gray-200">
              <div className="flex relative right-0 text-base font-medium text-left py-5 pl-2 pr-2.5">
                비밀번호
              </div>
              <button
                className="text-black w-[20%] py-2 rounded bg-slate-300 hover:bg-gray-300"
                onClick={() => setPasswordModal(true)} // 비밀번호 변경 버튼 클릭시 모달 열기
              >
                변경
              </button>
            </div>
            
            { passwordModal && (
              <PassWordChange
                passwordModal={passwordModal}
                setPasswordModal={setPasswordModal}
              />
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                onClick={() => setModifyModal(false)}
              >
                취소
              </button>
              <button
                className="bg-[#2B0585] text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => {
                  profileModify();
                  setModifyModal(false);
                }}
              >
                수정하기
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModify;