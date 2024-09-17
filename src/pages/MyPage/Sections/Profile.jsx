import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import ProfileModify from "./ProfileModal/ProfileModify";
import UserQuit from "./ProfileModal/UserQuit";

const Profile = () => {
  const userId = useSelector((state) => state.user?.userData.id);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [modifyModal, setModifyModal] = useState(false); // 프로필 수정 모달
  const [quitModal, setQuitModal] = useState(false); // 회원 탈퇴 모달
  const [passwordModal, setPasswordModal] = useState(false); // 비밀번호 변경 모달

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

  return (
    <div className="w-full h-[170px] bg-white">
      <div
        id="프로필 & 수정 & 탈퇴"
        className="w-full h-full shadow-md flex items-center justify-start"
      >
        <div
          id="프로필 사진"
          className="w-24 h-24 relative object-cover border-2 border-gray-300 rounded-full mx-14 block"
        >
          <div className="w-7 h-7 absolute rounded-full bottom-0 right-0 text-gray-500 bg-gray-200 cursor-pointer grid place-items-center">
            <FaCamera style={{ fontSize: "1rem" }} />
          </div>
        </div>
        <div className="flex flex-col items-left ml-6">
          <div id="회원 이름" className="relative mb-1 text-lg">
            {name}
          </div>
          <div className="flex space-x-5">
            <button
              id="프로필 수정"
              className="w-24 h-8 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200"
              onClick={() => setModifyModal(true)} // 프로필 수정 모달 열기
            >
              프로필 수정
            </button>
            {/* 프로필 수정 모달창 불러오기 */}
            <ProfileModify
              modifyModal={modifyModal}
              setModifyModal={setModifyModal}
              userId={userId}
              axiosInstance={axiosInstance}
              toast={toast}
              navigate={navigate}
            />

            <button
              id="회원 탈퇴"
              className="w-24 h-8 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200"
              onClick={() => setQuitModal(true)} // 회원 탈퇴 모달 열기
            >
              회원 탈퇴
            </button>
            {/* 회원 탈퇴 모달창 불러오기 */}
            <UserQuit
              quitModal={quitModal}
              setQuitModal={setQuitModal}
              userId={userId}
              axiosInstance={axiosInstance}
              toast={toast}
              navigate={navigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
