import React from "react"; 

const UserQuit = ({
  quitModal,
  setQuitModal,
  userId,
  axiosInstance,
  toast,
  navigate,
}) => {
  const deleteUser = async () => {
    try {
      const response = await axiosInstance.post(`users/delete/${userId}`);
      if (response.status === 200) {
        console.log("회원 탈퇴 완료", response.data);
        toast.info("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      { quitModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white w-[280px] h-[150px] p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold">정말 탈퇴하시겠습니까?</p>
              <p className="text-xs text-red-500 mt-2">탈퇴하면 회원에 관련된 모든 데이터는 삭제됩니다.</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-[#2B0585] text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => {
                  deleteUser();
                  setQuitModal(false); // 모달 닫기
                }}
              >
                확인
              </button>
              <button
                className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                onClick={() => setQuitModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default UserQuit;