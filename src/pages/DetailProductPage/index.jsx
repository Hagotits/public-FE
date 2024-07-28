import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ProductImage from "./Sections/ProductImage";
import dayjs from "dayjs";

const DetailProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/${productId}?type=single`
        );
        console.log(response.data);
        const productData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {product && (
        <div key={product.id} className="relative w-[700px] h-[90%]">
          <div id="이미지"
               className="w-full h-[400px] rounded-[15px] border border-[#c5c5c5]">
                <ProductImage product={product} />
          </div>
          <div id="글쓴 회원 정보"
               className="w-full h-[100px] border-b border-gray-500 relative flex py-[10px]">
            <div id="프로필 이미지"
                 className="w-[80px] h-full rounded-full border-2 border-[#c1c1c1]"></div>
            <div className="h-full flex flex-col justify-center items-start ml-[20px]">
              <div id="닉네임" className="mb-[5px]">{product.userId}</div>
              <div id="거래 장소">{product.places}</div>
            </div>
          </div>

          <div>
            <div id="제목"
                 className="w-full h-[50px] text-[25px] font-normal mt-[30px] mb-[10px]">
                  {product.title}
            </div>
            <div id="가격"
                 className="w-full h-[40px] text-[20px] font-bold mb-[10px]">
                  {product.price}원
            </div>
            <div id="설명"
                 className="text-[16px]">
                  {product.content}
            </div>
          </div>

          <div className="relative flex justify-end flex-row items-end mt-[50px]">
            <div id="회색글씨" className="flex flex-col items-end mr-[10px]">
              <div id="남은 인원"
                   className="text-[12px] text-[rgb(182, 182, 182)]">
                    {product.attend - 1}명 남음
              </div>
              <div id="남은 시간"
                   className="text-[12px] text-[rgb(182, 182, 182)] mt-[3px]">
                    {dayjs(product.receptTime).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
            <button id="참여 버튼"
                    className="w-[200px] h-10 text-[14px] font-semibold bg-purple-800 rounded-md text-white hover:bg-puple-400">
                      {Math.floor(product.price / product.attend)}원으로 참여하기
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProductPage;
