import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import dayjs from "dayjs";
import KakaoMapAPI from "../../components/KakaoMap";
import People from "./Sections/People";
import CustomDatePicker from "./Sections/People";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { FaCalendar } from "react-icons/fa";
import "./../../index.js";

const UploadProductPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attend, setAttend] = useState(""); // 거래 인원 관련 상태
  const [customAttend, setCustomAttend] = useState(""); // 직접 입력 값 상태
  const [mapLocation, setMapLocation] = useState();
  const [date, setDate] = useState(new Date());
  // const [startDate, setStartDate] = useState(new Date());
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(""); // 선택된 날짜와 시간 상태

  const handleImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = async (data) => {
    const formattedDateTime = dayjs(date).format("YYYY-MM-DD HH:mm");
    const body = {
      userId: userData.id,
      userName: userData.name,
      ...data,
      images,
      location: mapLocation,
      attend: attend === "직접 입력" ? customAttend : attend, // 직접 입력 값 처리
      receptTime: formattedDateTime,
    };

    try {
      const response = await axiosInstance.post("/products", body);
      const newProductId = response.data.productId;
      if (response.data) {
        navigate(`/products/${newProductId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 거래 날짜 선택 시 선택된 날짜와 시간을 업데이트
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDateTime = dayjs(selectedDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      setSelectedDateTime(formattedDateTime);
    } else {
      setSelectedDateTime("");
    }
  };

  // 거래 날짜 선택
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setAttend(selectedOption.value);
      if (selectedOption.value === "직접 입력") {
        setCustomAttend("");
      } else {
        setCustomAttend(""); // 선택이 다른 값일 때 커스텀 입력값을 초기화
      }
    } else {
      setAttend("");
      setCustomAttend("");
    }
  };

  // 선택한 날짜가 오늘인지 확인
  const isToday = (date) => {
    const today = dayjs().startOf("day");
    return dayjs(date).isSame(today, "day");
  };

  // 시간 필터링 함수
  const filterTime = (time) => {
    if (isToday(date)) {
      const now = new Date();
      return time.getTime() >= now.getTime(); // 선택한 날짜가 오늘일 경우 현재시간 이후의 시간만 선택 가능
    }
    return true; // 선택한 날짜가 오늘이 아닐 경우 모든 시간 선택 가능
  };

  useEffect(() => {
    if (mapLocation) {
      setValue("places", mapLocation.address);
    }
  }, [mapLocation, setValue]);

  const productTitle = {
    required: "필수 항목입니다.",
  };

  const productContent = {
    required: "필수 항목입니다.",
  };

  const productPlaces = {
    required: "필수 항목입니다.",
  };

  const productPrice = {
    required: "필수 항목입니다.",
    minPrice: 1,
  };

  const productAttend = {
    required: "필수 항목입니다.",
    maxLength: 4,
    minLength: 1,
  };

  const productReceptTime = {
    required: "필수 항목입니다.",
    minLength: dayjs().format("YYYY-MM-DDTHH:mm"),
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="relative w-4/5 flex flex-col justify-center items-start border-b border-gray-300 mt-8">
        <h1 id="상품 정보" className="text-2xl">
          상품 정보
        </h1>
      </div>

      <div className="w-[60%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 이미지"
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <FileUpload images={images} handleImagesSave={handleImages} />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품명"
              htmlFor="title"
              className="text-base font-medium text-left pr-2.5"
            >
              상품명
            </label>
            <div className="w-full">
              <input
                name="title"
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400"
                {...register("title", productTitle)}
              />
              {errors.title && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.title.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 설명"
              htmlFor="content"
              className="text-base font-medium text-left pr-2.5"
            >
              설명
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md h-[100px] border border-gray-400"
                name="content"
                {...register("content", productContent)}
              />
              {errors.content && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.content.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 가격"
              htmlFor="price"
              className="text-base font-medium text-left pr-2.5"
            >
              가격
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                name="price"
                type="text"
                placeholder="판매하고 싶은 가격을 작성해주세요."
                {...register("price", productPrice)}
              />
              {errors.price && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.price.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* 거래 인원 */}
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 인원"
              htmlFor="attend"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 인원
            </label>
            <People
              attend={attend}
              setAttend={setAttend}
              customAttend={customAttend}
              setCustomAttend={setCustomAttend}
              errors={errors.attend ? { attend: errors.attend } : {}}
              handleSelectChange={handleSelectChange}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 장소"
              htmlFor="places"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 장소
            </label>
            <div className="w-full z-0">
              <KakaoMapAPI onLocationChange={setMapLocation} />
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400 hidden"
                name="places"
                {...register("places", productPlaces)}
              />
              {errors.places && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.places.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* 거래 날짜 */}
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 날짜"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 날짜
            </label>
            <div className="relative w-full">
              <DatePicker
                // showIcon
                // icon="fa Fa-calendar"
                inline // 화면에 달력, 시간 표시
                selected={date} // 선택된 날짜를 ReactDatePicker에 전달
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                timeCaption="time"
                dateFormat="yyyy-MM-dd, h:mm aa"
                locale={ko}
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400 cursor-pointer z-90"
                placeholderText="거래 날짜를 선택해주세요."
                minDate={new Date()} // 현재 날짜보다 이전은 선택 불가
                filterTime={filterTime} // 시간 필터링
                calendarStartDay={1} // 월요일부터 시작
              />
              {errors.receptTime && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.receptTime.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="mt-12 mb-8 w-full h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
              type="submit"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProductPage;
