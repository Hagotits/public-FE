import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userId = useSelector((state) => state.user?.userData.id);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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

  const deleteUser = async () => {
    const confirmDelete = window.confirm("회원 탈퇴를 진행하시겠습니까?");
    // 탈퇴를 진행하면, localStorage에 있는 데이터 있나 보고 있으면 지우고, 로그아웃 처리 & 리다이렉트 로직 진행해준다. 그리고 백엔드에서 로그인은 되면서 동시에 아이디가 없습니다가 나오니까 이 부분도 해결해야함
    if (confirmDelete) {
      try {
        const response = await axiosInstance.post(`users/delete/${userId}`);
        console.log("회원 탈퇴 완료", response.data);
        toast.info("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

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
              onClick={deleteUser}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
