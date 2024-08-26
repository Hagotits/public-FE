import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import FileUpload from "../../components/FileUpload";
import { TiDelete } from "react-icons/ti";
import dayjs from "dayjs";
import KakaoMapAPI from "../../components/KakaoMap";

const EditProductPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState(null); // product 상태 초기화
  const [images, setImages] = useState([]); // 새로 추가한 이미지 저장
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mapLocation, setMapLocation] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams(); // URL에서 productId를 가져옴
  const userData = useSelector((state) => state.user?.userData);

  const handleImages = (newImages) => {
    setImages(newImages);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/${productId}?type=single`
        );
        const productData = Object(response.data[0]);

        setValue("title", productData.title);
        setValue("content", productData.content);
        setValue("price", productData.price);
        setValue("attend", productData.attend);
        setValue("places", productData.places);

        const formattedTime = dayjs(productData.receptTime).format(
          "YYYY-MM-DDTHH:mm"
        );
        setSelectedTime(formattedTime);
        setProduct(productData);
        setImages(productData.images || []);
      } catch (error) {
        console.error("상품 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchProduct(); // 컴포넌트가 마운트되면 제품 정보를 가져옴
  }, [productId, setValue]);

  const onEdit = async (data) => {
    const uniqueImages = Array.from(
      new Set([...images].map((image) => image.id))
    ).map((id) => {
      return images.find((image) => image.id === id);
    });

    const body = {
      userId: userData.id,
      userName: userData.name,
      images: uniqueImages,
      productId: productId,
      ...data,
      location: mapLocation,
    };

    try {
      const response = await axiosInstance.put(`/products/${productId}`, body); // 제품 정보 수정
      if (response.data) {
        navigate(`/products/${productId}`); // 수정 후 상세 페이지로 리다이렉트
      }
    } catch (error) {
      console.error("상품 정보를 수정하는 중 오류 발생:", error);
    }
  };

  const handleImagesDelete = async (index) => {
    const imageToDelete = product.images[index];
    try {
      const response = await axiosInstance.delete(
        `/images/${imageToDelete.id}?productId=${productId}`
      );

      const updatedImages = product.images.filter(
        (_, imgIndex) => imgIndex !== index
      );
      handleImages(updatedImages);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-[60%] flex flex-col justify-center items-start border-b border-gray-300 mb-8">
        <h1 id="상품 정보" className="text-2xl">
          상품 정보 수정
        </h1>
      </div>

      <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit(onEdit)} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 이미지"
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <div className="w-full">
              <FileUpload images={images} handleImagesSave={handleImages} />
              {images.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {product.images.map((image, index) => (
                    <div key={image.id || index} className="relative">
                      <button
                        type="button"
                        onClick={() => handleImagesDelete(index)}
                        style={{
                          position: "absolute",
                          top: "1px",
                          right: "9px",
                          border: "none",
                          borderRadius: "50%",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <TiDelete size={25} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                type="text"
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
              id="설명"
              htmlFor="content"
              className="text-base font-medium text-left pr-2.5"
            >
              설명
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                type="text"
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
              id="가격"
              htmlFor="price"
              className="text-base font-medium text-left pr-2.5"
            >
              가격
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                type="text"
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
                type="text"
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
              <KakaoMapAPI onLocationChange={setMapLocation} />
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
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
              htmlFor="receptTime"
              className="text-base font-medium text-left pr-2.5"
            >
              수령 날짜
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                type="datetime-local"
                onChange={handleTimeChange}
                defaultValue={selectedTime}
                {...register("receptTime", productReceptTime)}
              />

              {errors.receptTime && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.receptTime.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <button
              className="mt-12 ml-8 w-[40%] h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
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
