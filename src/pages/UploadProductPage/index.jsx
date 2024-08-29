import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import dayjs from "dayjs";
import KakaoMapAPI from "../../components/KakaoMap";

const UploadProductPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mapLocation, setMapLocation] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [num, setNum] = useState("");

  const handleImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = async (data) => {
    const body = {
      userId: userData.id,
      userName: userData.name,
      ...data,
      images,
      location: mapLocation,
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
      setErrorMessage("수령 날짜를 선택해주세요");
    } else if (dayjs(value).isBefore(dayjs())) {
      setErrorMessage("선택한 시간은 현재 시간보다 작을 수 없습니다.");
    } else {
      setErrorMessage("");
      setValue("receptTime", value);
    }
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

  const inputPrice = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]/g, ""); // 숫자가 아닌 모든 문자 제거
    };
    return comma(uncomma(str));
  };

  const handlePriceChange = (e) => {
    setNum(inputPrice(e.target.value)); // input 값을 업데이트
  };

  const selectOption = [
    {value: "zero", name: "몇 명에게 판매하고 싶은가요?"},
    {value: "one", name: "1"},
    {value: "two", name: "2"},
    {value: "three", name: "3"},
    {value: "four", name: "4"},
    {value: "five", name: "5"},
  ];
  const [select, setSelect] = useState("몇 명에게 판매하고 싶은가요?");

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="relative w-4/5 flex flex-col justify-center items-start border-b border-gray-300 mt-8">
        <h1 id="상품 정보" className="text-2xl">
          상품 정보
        </h1>
      </div>

      <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
            <label
              id="상품 이미지"
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <FileUpload images={images} handleImagesSave={handleImages} />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
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

          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
            <label
              id="상품 설명"
              htmlFor="content"
              className="text-base font-medium text-left pr-2.5"
            >
              설명
            </label>
            <div className="w-full">
              <textarea
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md h-[150px] border border-gray-400"
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

          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
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
                value={num}
                onChange={handlePriceChange}
                placeholder="얼마에 판매하고 싶은가요?"
                {...register("price", productPrice)}
                // 바로 윗 줄만 주석처리하면 입력할 때도 , 나타나는데 그럼 가격 입력안해도 글 등록돼서 일단 둠
              />
              {errors.price && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.price.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
            <label
              id="거래 인원"
              htmlFor="attend"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 인원
            </label>
            <div className="w-full">
              <select
                className="w-full text-sm font-normal text-gray-400 p-2.5 rounded-md border border-gray-400"
                {...register("attend", productAttend)}
              >
                {selectOption.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="text-sm text-blue-700">
                <p>* 60구 계란을 파는 경우 - 6명을 선택하면 인당 10개씩 가지는 것</p>
                <p>* 총 5명에게 인당 10개씩 총 50개를 판매하고 나머지 10개는 본인이 사용</p>
              </div>
              {errors.attend && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.attend.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
            <label
              id="거래 장소"
              htmlFor="places"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 장소
            </label>
            <div className="w-full">
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

          <div className="grid grid-cols-[100px_1fr] items-center mb-10">
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
