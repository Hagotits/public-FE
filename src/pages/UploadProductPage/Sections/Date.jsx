// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import dayjs from "dayjs";

// const CustomDatePicker = ({ selectedDate, setSelectedDate, register, errors }) => {
  
//   // 선택한 날짜가 오늘인지 확인
//   const isToday = (date) => {
//     const today = dayjs().startOf("day");
//     return dayjs(date).isSame(today, "day");
//   };

//   // 시간 필터링 함수
//   const filterTime = (time) => {
//     if (isToday(selectedDate)) {
//       const now = new Date();
//       return time.getTime() >= now.getTime(); // 선택한 날짜가 오늘일 경우 현재시간 이후의 시간만 선택 가능
//     }
//     return true; // 선택한 날짜가 오늘이 아닐 경우 모든 시간 선택 가능
//   };

//   const handleTimeChange = (e) => {
//     const value = e.target.value;
//     setSelectedTime(value);

//     if (!value) {
//       setErrorMessage("수령 날짜를 선택해주세요");
//     } else if (dayjs(value).isBefore(dayjs())) {
//       setErrorMessage("선택한 시간은 현재 시간보다 작을 수 없습니다.");
//     } else {
//       setErrorMessage("");
//       setValue("receptTime", value);
//     }
//   };

//   return (
//     <div className="w-full">
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         showTimeSelect
//         timeFormat="HH:mm"
//         timeIntervals={10}
//         timeCaption="time"
//         dateFormat="yyyy-MM-dd, h:mm aa"
//         className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400 cursor-pointer z-90"
//         placeholderText="거래 날짜를 선택해주세요."
//         minDate={new Date()} // 현재 날짜보다 이전은 선택 불가
//         filterTime={filterTime} // 시간 필터링
//       />
//       {errors.receptTime && (
//         <div className="mt-1 text-red-500 text-sm">
//           <span>{errors.receptTime.message}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomDatePicker;