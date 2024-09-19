import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileModify from "./ProfileModal/ProfileModify";
import UserQuit from "./ProfileModal/UserQuit";

const Profile = () => {
  const userId = useSelector((state) => state.user?.userData.id);
  const userAvatar = useSelector((state) => state.user?.userData.avatar);
  const userName = useSelector((state) => state.user?.userData.name);

  const [modifyModal, setModifyModal] = useState(false);
  const [quitModal, setQuitModal] = useState(false);

  const [localName, setLocalName] = useState(userName);
  const [localAvatar, setLocalAvatar] = useState(userAvatar);

  // Redux 상태가 변하면 로컬 상태도 업데이트
  useEffect(() => {
    setLocalName(userName);
    setLocalAvatar(userAvatar);
  }, [userName, userAvatar]);

  // 아바타 URL을 처리하는 함수
  const formatAvatarUrl = (avatar) => {
    if (!avatar) {
      // 기본 이미지 URL 설정
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    }
    return avatar.startsWith('"') && avatar.endsWith('"')
      ? `http://localhost:4000/${avatar.replace(/(^"|"$)/g, "")}`
      : `http://localhost:4000/${avatar}`;
  };

  // updateUserData 함수로 로컬 상태 업데이트
  const updateUserData = (updatedUser) => {
    setLocalName(updatedUser.name);
    setLocalAvatar(updatedUser.avatar);
  };

  return (
    <div className="w-full h-[170px] bg-white">
      <div className="w-full h-full shadow-md flex items-center justify-start">
        <div className="w-24 h-24 relative object-cover border-2 border-gray-300 rounded-full mx-14 block">
          <img
            src={formatAvatarUrl(localAvatar)}
            alt="프로필"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col items-left ml-6">
          <div className="relative mb-1 text-lg">{localName}</div>
          <div className="flex space-x-5">
            <button
              className="w-24 h-8 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200"
              onClick={() => setModifyModal(true)}
            >
              프로필 수정
            </button>
            <ProfileModify
              modifyModal={modifyModal}
              setModifyModal={setModifyModal}
              userId={userId}
              updateUserData={updateUserData} // 사용자 정보 업데이트 함수 전달
            />
            <button
              className="w-24 h-8 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-indigo-200"
              onClick={() => setQuitModal(true)}
            >
              회원 탈퇴
            </button>
            <UserQuit
              quitModal={quitModal}
              setQuitModal={setQuitModal}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
