import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from '../../utils/axios';

const EditProductPage = () => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 상품 데이터 가져오기
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);

        // react-hook-form의 setValue를 사용해 폼 값 설정
        Object.keys(response.data).forEach(key => setValue(key, response.data[key]));
      } catch (error) {
        console.error("상품 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    getProduct();
  }, [id, setValue]);

  // 상품 수정
  const onSubmit = async (data) => {
    try {
      await axiosInstance.patch(`/products/${id}`, data);
      alert("수정되었습니다.");
      navigate(`/products/${id}`);
    } catch (error) {
      console.error("상품 수정 중 오류가 발생했습니다:", error);
      alert("상품 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-4/5 flex flex-col justify-center items-start border-b border-gray-300 mt-8">
        <h1 id="상품 정보" className="text-2xl">상품 정보</h1>
      </div>

      <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label htmlFor="title" className="text-base font-medium text-left pr-2.5">상품명</label>
            <div className="w-full">
              <input
                type="text"
                id="title"
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border-solid border border-gray-400"
                {...register("title", { required: "상품명은 필수입니다." })}
              />
              {errors.title && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.title.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* 추가적인 필드들... */}
          {/* 예: <input {...register("price")} /> */}

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