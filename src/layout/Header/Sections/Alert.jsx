import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { TbXboxXFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa"; //인원 충족
import { FaUsersSlash } from "react-icons/fa"; //인원 충족되지 않음
import { FaUserPlus } from "react-icons/fa"; //거래 참여 체크
import { GrUserExpert } from "react-icons/gr"; //2
import { BiSolidUserCheck } from "react-icons/bi"; //3
import { RiUserReceivedLine } from "react-icons/ri"; //거래참여 화살표
import { FcMoneyTransfer } from "react-icons/fc"; //가격제안
import { FaCommentDollar } from "react-icons/fa6";

const Alert = () => {

  return (
    <div className="absolute top-full right-0 mt-2 w-[400px] text-center bg-gray-300 rounded-lg">
      <div className="text-[20px] mt-6 mb-6 font-extrabold">알림</div>

      {/* 글쓴이에게 */}
      {/* 사용자가 가상계좌에 송금까지 완료한 경우 */}
      <ul className="flex flex-col m-3 mx-3 p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <RiUserReceivedLine
              className="mr-2 text-[25px]"
              style={{color: "blue"}} />
            <div className="flex flex-col text-left">
              <li className="text-[16.5px] font-bold">(userId)님이 거래에 참여했습니다.</li>
            </div>
          </div>
          <li className="text-gray-500 text-xs text-right">n분전</li>
        </div>
      </ul>

       {/* 24시간 이내로 남았을 경우 - 가격 제안 알림 */}
       <ul className="flex flex-col m-3 mx-3 p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaCommentDollar
              className="mr-2 mb-[28px] text-[25px]"
              style={{color: "blue"}} />
            <div className="flex flex-col text-left">
              <li className="text-[16.5px] font-bold">(userId)님이 가격을 제안했습니다.</li>
              <li>(스위스티켓 100만원 -- 50만원)</li>
            </div>
          </div>
          <li className="text-gray-500 text-xs text-right">n분전</li>
        </div>
        <div className="mt-2">
          <button className="text-[10px] p-1 mr-1 rounded-md bg-[#2B0585] text-white">제안 수락</button>
          <button className="text-[10px] p-1 rounded-md bg-[#2B0585] text-white">제안 거절</button>
        </div>
      </ul>

      {/* 참여자에게 */}
      {/* 글쓴이가 가격 제안을 수락한 경우 --> 가격 제인을 한 사람에게 */}
      <ul className="flex flex-col m-3 mx-3 p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaCheckCircle
              className="mr-2 mb-[25px] text-[25px]"
              style={{color: "rgb(86, 190, 56)"}} />
            <div className="flex flex-col text-left">
              <li className="text-[16.5px] font-bold">(userId)님이 제안을 승낙했습니다.</li>
              <li>(스위스티켓 100만원 -- 50만원)</li>
            </div>
          </div>
          <li className="text-gray-500 text-xs text-right">n분전</li>
        </div>
        <div className="mt-2">
          <button className="text-[10px] p-1 mr-1 rounded-md bg-[#2B0585] text-white">거래 참여</button>
          <button className="text-[10px] p-1 rounded-md bg-[#2B0585] text-white">거래 거절</button>
        </div>
      </ul>

      {/* 글쓴이가 가격 제안을 거절한 경우 --> 가격 제인을 한 사람에게 */}
      <ul className="flex m-3 mx-3 p-4 rounded-md bg-white justify-between items-center">
        <div className="flex justify-between items-center">
          <TbXboxXFilled
            className="mr-2 text-[28px]"
            style={{ color: "rgb(216, 46, 32)"}}/>
          <li className="text-[16.5px] font-bold">(userId)님이 제안을 거절했습니다.</li>
        </div>
        
        <li className="text-gray-500 text-xs text-right">n분전</li>
      </ul>

      {/* 거래 인원 충족된 경우 - 판매자, 구매자 모두에게 */}
      <ul className="flex flex-col m-3 mx-3 p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaUsers
              className="mr-2 mb-[30px] text-[25px]"
              style={{color: "rgb(86, 190, 56)"}} />
            <div className="flex flex-col text-left">
              <li className="text-[16.5px] font-bold">거래 인원이 충족되었습니다.</li>
              <li className="text-[16.5px] font-bold">시간과 장소 확인 후 거래에 참여하세요!</li>
            </div>
          </div>
          <li className="text-gray-500 text-xs text-right">n분전</li>
        </div>
      </ul>

      {/* 거래 인원 미달인 경우 - 구매자에게 */}
      <ul className="flex flex-col m-3 mx-3 p-4 rounded-md bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaUsersSlash
              className="mr-2 text-[25px]"
              style={{ color: "rgb(216, 46, 32)"}}/>
            <div className="flex flex-col text-left">
              <li className="text-[16.5px] font-bold">거래 인원이 충족되지 않았습니다.</li>
            </div>
          </div>
          <li className="text-gray-500 text-xs text-right">n분전</li>
        </div>
        <div className="mt-2">
          <button className="text-[10px] p-1 mr-1 rounded-md bg-[#2B0585] text-white">거래 포기</button>
          <button className="text-[10px] p-1 mr-1 rounded-md bg-[#2B0585] text-white">기존 금액으로 기존의 양만큼만 구매</button>
          <button className="text-[10px] p-1 rounded-md bg-[#2B0585] text-white">모인 인원끼리 n빵</button>
        </div>
      </ul>
    </div>
  );
};

export default Alert;