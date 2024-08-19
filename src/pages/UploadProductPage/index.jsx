import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import dayjs from "dayjs";

const UploadProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = async (data) => {
    const body = {
      userId: userData.id,
      userName: userData.name,
      ...data,
      images,
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

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setSelectedTime(value);

    if (!value) {
      setErrorMessage(productReceptTimeChange, required);
    } else if (dayjs(value).isBefore(dayjs())) {
      setErrorMessage("선택한 시간은 현재 시간보다 작을 수 없습니다.");
    } else {
      setErrorMessage("");
    }
  };

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
  };

  const productAttend = {
    required: "필수 항목입니다.",
    maxLength: 4,
  };

  const productReceptTime = {
    required: "필수 항목입니다.",
    minLength: dayjs().format("YYYY-MM-DDTHH:mm"),
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-4/5 flex flex-col justify-center items-start border-b border-gray-300 mt-8">
        <h1 id="상품 정보" className="text-2xl">
          상품 정보
        </h1>
      </div>

      <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 이미지"
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <FileUpload images={images} onImageChange={handleImages} />
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
              <textarea
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
                type="number"
                placeholder="물건의 원가를 작성해주세요."
                {...register("price", productPrice)}
              />
              {errors.price && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.price.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 인원"
              htmlFor="attend"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 인원
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                name="attend"
                type="number"
                placeholder="(본인 포함) 몇 명이서 나눠가지고 싶은가요?"
                {...register("attend", productAttend)}
              />
              {errors.attend && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.attend.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 장소"
              htmlFor="places"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 장소
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
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

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="수령 날짜"
              className="text-base font-medium text-left pr-2.5"
            >
              수령 날짜
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                type="datetime-local"
                name="receptTime"
                onChange={handleTimeChange}
                min={productReceptTime.minLength}
                {...register("receptTime", productReceptTime)}
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