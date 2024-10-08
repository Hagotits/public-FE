import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import FileUpload from "../../components/FileUpload";
import dayjs from "dayjs";
import KakaoMapAPI from "../../components/KakaoMap";
import People from "./Sections/People";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const EditProductPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const [date, setDate] = useState(new Date());
  const [attend, setAttend] = useState(0);
  const [customAttend, setCustomAttend] = useState("");
  const [mapLocation, setMapLocation] = useState(null);

  const navigate = useNavigate();
  const { productId } = useParams();
  const userData = useSelector((state) => state.user?.userData);

  useEffect(() => {
    // 기존 상품 정보 가져오기
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/${productId}?type=single`
        );
        const fetchedProduct = response.data[0];
        if (fetchedProduct.attend)
          console.log("Attend:", fetchedProduct.attend);
        // 폼 데이터 초기화
        Object.entries(fetchedProduct).forEach(([key, value]) => {
          if (key === "receptTime") {
            setDate(new Date(value)); // 날짜 포맷 변경
            setValue(key, new Date(value).toISOString());
          } else {
            setValue(key, value);
          }
        });

        setImages(fetchedProduct.images || []);
        setAttend(fetchedProduct.attend);
        setMapLocation({ address: fetchedProduct.location });
      } catch (error) {
        console.error("상품 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchProduct();
  }, [productId, setValue]);

  // 이미지 핸들러
  const handleImages = (newImages) => {
    setImages(newImages);
  };

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    console.log(data);
    const formattedDateTime = dayjs(date).format("YYYY-MM-DD HH:mm");
    const body = {
      productId: productId,
      userId: userData?.id,
      userName: userData?.name,
      ...data,
      images,
      location: mapLocation?.address,
      attend: attend === "직접 입력" ? customAttend : attend,
      receptTime: formattedDateTime,
    };

    try {
      const response = await axiosInstance.put(`/products/${productId}`, body);
      if (response.data) {
        navigate(`/products/${productId}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // 날짜 선택 핸들러
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setValue("receptTime", selectedDate ? selectedDate.toISOString() : "");
  };

  // 거래 인원 선택 핸들러
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setAttend(selectedOption.value);
      setValue("attend", selectedOption.value);
      if (selectedOption.value === "직접 입력") {
        setCustomAttend("");
      } else {
        setCustomAttend("");
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
      return time.getTime() >= now.getTime();
    }
    return true;
  };

  useEffect(() => {
    if (mapLocation) {
      setValue("places", mapLocation.address);
    }
  }, [mapLocation, setValue]);

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="relative w-4/5 flex flex-col justify-center items-start border-b border-gray-300 mt-8">
        <h1 className="text-2xl">상품 수정</h1>
      </div>

      <div className="w-[60%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <FileUpload images={images} handleImagesSave={handleImages} />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              htmlFor="title"
              className="text-base font-medium text-left pr-2.5"
            >
              상품명
            </label>
            <div className="w-full">
              <input
                name="title"
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400"
                {...register("title", { required: "필수 항목입니다." })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              htmlFor="content"
              className="text-base font-medium text-left pr-2.5"
            >
              설명
            </label>
            <div className="w-full">
              <textarea
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400 h-[150px]"
                name="content"
                {...register("content", { required: "필수 항목입니다." })}
              />
              {errors.content && (
                <span className="text-red-500 text-sm">
                  {errors.content.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
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
                {...register("price", { required: "필수 항목입니다." })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          {/* 거래 인원 */}
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
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
              {...register("attend", { required: "필수 항목입니다." })}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              htmlFor="places"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 장소
            </label>
            <div className="w-full z-0">
              <KakaoMapAPI onLocationChange={setMapLocation} />
              <input
                type="hidden"
                name="places"
                {...register("places", { required: "필수 항목입니다." })}
              />
              {errors.places && (
                <span className="text-red-500 text-sm">
                  {errors.places.message}
                </span>
              )}
            </div>
          </div>

          {/* 거래 날짜 */}
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label className="text-base font-medium text-left pr-2.5">
              거래 날짜
            </label>
            <div className="relative w-full">
              <DatePicker
                inline
                selected={date}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={10}
                timeCaption="time"
                dateFormat="yyyy-MM-dd, h:mm aa"
                locale={ko}
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400 cursor-pointer"
                placeholderText="거래 날짜를 선택해주세요."
                minDate={new Date()}
                filterTime={filterTime}
                calendarStartDay={1}
              />
              {errors.receptTime && (
                <span className="text-red-500 text-sm">
                  {errors.receptTime.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              className="mt-12 mb-8 w-full h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
              type="submit"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
