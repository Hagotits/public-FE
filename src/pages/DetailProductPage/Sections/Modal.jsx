import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "확인", cancelText = "취소" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-[250px] h-[150px] p-4 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-gray-500 mt-2">{message}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          {onConfirm && (
            <button
              className="bg-[#2B0585] text-white py-1 px-3 rounded hover:bg-blue-700"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
          <button
            className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            {onConfirm ? cancelText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;