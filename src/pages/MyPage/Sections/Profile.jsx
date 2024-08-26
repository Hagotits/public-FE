import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userId = useSelector((state) => state.user?.userData.id);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [quitModal, setQuitModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`users/mypage/${userId}`);
        setName(response.data.user.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, [userId]);

  // 이부분 진행중
  // const profileModify = async() => {
  //   try {
  //     const response = await axiosInstance.post(`users/mypage/${userId}`)
  //   }
  // }

  // 회원 탈퇴
  const deleteUser = async () => {
    try {
      const response = await axiosInstance.post(`users/delete/${userId}`);
      if (response.status === 200) {
        console.log("회원 탈퇴 완료", response.data);
        toast.info("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(err)
    }
  }

  return (
    <div className="w-full h-full bg-white">
      <div
        id="프로필 & 수정 & 탈퇴"
        className="w-full h-15 shadow-md flex items-center"
      >
        <div
          id="프로필 사진"
          className="w-24 h-24 object-cover border-2 border-gray-300 rounded-full mx-14 block"
        />
        <div className="w-4/5">
          <div id="회원 이름" className="w-full h-1/2 mb-1 text-lg my-10">
            {name}
          </div>
          <div className="w-full h-1/2">
            <button
              id="프로필 수정"
              className="w-24 h-8 mr-5 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200"
            >
              프로필 수정
            </button>
            <button
              id="회원 탈퇴"
              className="w-24 h-8 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200 mb-16"
              onClick={() => setQuitModal(true)} // 모달 열기
            >
              회원 탈퇴
            </button>

            { quitModal && (
              <div
                className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
              >
                <div className="bg-white w-[250px] h-[150px] p-4 rounded-lg shadow-lg flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold">정말 탈퇴하시겠습니까?</p>
                    <p className="text-xs text-red-500 mt-2">탈퇴하면 회원에 관련된 모든 데이터는 삭제됩니다.</p>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      className="bg-[#2B0585] text-white py-1 px-3 rounded hover:bg-blue-700"
                      onClick={() => {
                        deleteUser();
                        setQuitModal(false); // 모달 닫기
                      }}
                      >
                        확인
                    </button>
                    <button
                      className=" bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                      onClick={() => setQuitModal(false)}
                    >
                      취소
                    </button>
                  </div>

                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
