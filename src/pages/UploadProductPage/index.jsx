import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";

const places = [
  { key: 1, value: "선택해주세요." },
  { key: 2, value: "신촌 세븐 앞" },
  { key: 3, value: "신촌 짱돌 앞" },
  { key: 4, value: "단월 농협 앞" },
  { key: 5, value: "모시래 세븐 앞" },
  { key: 6, value: "모시래 기숙사 여동 앞" },
  { key: 7, value: "모시래 기숙사 남동 앞" },
  { key: 8, value: "해오름 기숙사 여동 앞" },
  { key: 9, value: "해오름 기숙사 남동 앞" },
];

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    content: "",
    places: 1,
    price: 0,
    attend: 0,
    images: [],
    receptTime: "",
  });
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      userId: userData.id,
      ...product,
    };

    try {
      const response = await axiosInstance.post("/products", body);
      if (response.data) {
        const newProductId = response.data.productId;
        await navigate(`/products/${newProductId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-4/5 flex flex-col justify-center items-start border-b border-gray-300 mt-8">
        <h1 id="상품 정보" className="text-2xl">
          상품 정보
        </h1>
      </div>

      <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 이미지"
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <FileUpload images={product.images} onImageChange={handleImages} />
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품명"
              htmlFor="title"
              className="text-base font-medium text-left pr-2.5"
            >
              상품명
            </label>
            <input
              name="title"
              className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid"
              onChange={handleChange}
              value={product.title}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 설명"
              htmlFor="content"
              className="text-base font-medium text-left pr-2.5"
            >
              설명
            </label>
            <input
              className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md h-[100px]"
              name="content"
              onChange={handleChange}
              value={product.content}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 가격"
              htmlFor="price"
              className="text-base font-medium text-left pr-2.5"
            >
              가격
            </label>
            <input
              className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md"
              name="price"
              type="number"
              onChange={handleChange}
              value={product.price}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 인원"
              htmlFor="attend"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 인원
            </label>
            <input
              className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md"
              name="attend"
              type="number"
              onChange={handleChange}
              value={product.attend}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="거래 장소"
              htmlFor="place"
              className="text-base font-medium text-left pr-2.5"
            >
              거래 장소
            </label>
            <div
              className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md"
              name="places"
              onChange={handleChange}
              value={product.places}
            >
              {places.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="수령 날짜"
              className="text-base font-medium text-left pr-2.5"
            >
              수령 날짜
            </label>
            <input
              className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md"
              type="datetime-local"
              name="receptTime"
              onChange={handleChange}
              value={product.receptTime}
            />
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
