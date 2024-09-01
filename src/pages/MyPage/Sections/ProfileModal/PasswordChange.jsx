import React from "react";

const PassWordChange = ({ passwordModal, setPasswordModal }) => {
  return (
    <div>
      { passwordModal && (
        <div className="fixed inset-0 flex justify-center">
          <div className="fixed bg-white w-[400px] h-[450px] p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="flex justify-center font-semibold text-[20px] py-4">비밀번호 변경</h2>
            <div>
              <div>현재 비밀번호</div>
              <input className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400" />
            </div>
            <div>
              <div>새 비밀번호</div>
              <input className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400" />
            </div>
            <div>
              <div>새 비밀번호 확인</div>
              <input className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400" />
            </div>
            <div className="flex justify-end right-0 mt-7">
              <button
                className="text-white w-[27%] py-2 rounded bg-[#2B0585] hover:bg-gray-300 mr-2"
                onClick={() => {
                  setPasswordModal(false);  // 모달 닫기
                }}
              >
                변경 저장
              </button>
              <button
                className="text-black w-[20%] py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setPasswordModal(false);  // 모달 닫기
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassWordChange;