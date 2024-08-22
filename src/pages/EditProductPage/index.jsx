import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import FileUpload from "../../components/FileUpload";
import { TiDelete } from "react-icons/ti";

const EditProductPage = () => {
  const { productId } = useParams(); // URL에서 productId를 가져옴
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // product 상태 초기화
  const [newImages, setNewImages] = useState([]); // 새로 추가한 이미지 저장

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`);
        const productData = Array.isArray(response.data) ? response.data[0] : response.data;
        setProduct(productData); // API에서 받은 제품 데이터를 상태로 설정
        setNewImages([]);
      } catch (error) {
        console.error("상품 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchProduct(); // 컴포넌트가 마운트되면 제품 정보를 가져옴
  }, [productId]);

  const handleEdit = async () => {
    try {
      const updateProduct = {
        ...product,
        images: [...(product.images || []), ...newImages], // 기존 이미지와 새로 추가한 이미지 병합
      };
      await axiosInstance.put(`/products/${productId}`, updateProduct); // 제품 정보 수정
      navigate(`/products/${productId}`); // 수정 후 상세 페이지로 리다이렉트
    } catch (error) {
      console.error("상품 정보를 수정하는 중 오류 발생:", error);
    }
  };

  // 새 이미지 저장
  const handleImagesSave = (updatedImages) => {
    setNewImages(updatedImages);
  };

  const handleImagesDelete = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1); // 이미지 삭제
    setProduct({...product, images: updatedImages });
  };

  if (!product) return <div>로딩 중...</div>; // 제품 정보가 로드되지 않았을 때 로딩 중 표시

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative w-[60%] flex flex-col justify-center items-start border-b border-gray-300 mb-8">
        <h1 id="상품 정보" className="text-2xl">상품 정보 수정</h1>
      </div>

      <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
        <form className="w-full">
          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 이미지"
              htmlFor="Img"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 이미지
            </label>
            <div className="w-full">
              <FileUpload images={newImages} handleImagesSave={handleImagesSave} />
              {product.images && product.images.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                      key={index}
                      src={`http://localhost:4000/${image}`}
                      className="w-[103px] h-[103px] object-cover rounded-md mr-2"
                      alt={`상품 이미지 ${index + 1}`}
                      />
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
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
              />
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
                value={product.content}
                onChange={(e) => setProduct({ ...product, content: e.target.value })}
              />
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
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              />
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
                value={product.attend}
                onChange={(e) => setProduct({ ...product, attend: e.target.value })}
              />
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
                type="text"
                value={product.places}
                onChange={(e) => setProduct({ ...product, places: e.target.value })}
              />
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
                value={product.receptTime}
                onChange={(e) => setProduct({ ...product, receptTime: e.target.value })}
              />
            </div>
          </div>

  

          <div className="w-full">
            <button 
              className="mt-12 ml-8 w-[40%] h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
              type="button"
              onClick={handleEdit}
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