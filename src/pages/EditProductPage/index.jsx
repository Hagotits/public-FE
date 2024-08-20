// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axiosInstance from '../../utils/axios';
// import dayjs from "dayjs";

// const EditProductPage = ({ id, title }) => {
//   const [Edit, setEdit] = useState(false); // 현재 수정 모드인지 아닌지 상태 나타냄
//   const toggleEdit = () => setEdit(!Edit); // 수정 모드와 보기 모드 전환

//   const [localProduct, setLocalProduct] = useState(title);

//   const localProductInput = useRef();

//   // 수정 취소
//   // 취소하면 초기값으로 되돌림
//   const handleQuitEdit = () => {
//     setEdit(false);
//     setLocalProduct(title);
//   };

//   // 수정
//   const handleEdit = () => {
//     if(localProduct.length < 2) {
//       localProductInput.current.focus();
//       return;
//     }
//     if (window.confirm("수정하시겠습니까?")){
//       title(id, localProduct);
//       toggleEdit();
//     }
//   };

//   return (
//     <div>
//       <h1>상품 정보</h1>

//       <div>
//         {Edit ? (
//           <>
//             <textarea
//               ref={localProductInput}
//               value={localProduct}
//               onChange={(e) => setLocalProduct(e.target.value)}
//             />
//           </>
//         ) : (
//           <>
//             {title}
//           </>
//         )}
//       </div>

//       {Edit ? (
//         <>
//           <button
//             className="mt-12 mb-8 w-[30%] h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
//             type="submit"
//             onClick={handleQuitEdit}
//           >
//             수정 취소
//           </button>
//           <button
//             className="mt-12 mb-8 w-[30%] h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
//             type="submit"
//             onClick={handleEdit}
//           >
//             수정 완료
//           </button>
//         </>
//       ) : (
//         <button onClick={toggleEdit}>수정하기</button>
//       )}
//     </div>
//   );
// };

// export default EditProductPage;




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const EditProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // 수정 취소
  // 취소하면 초기값으로 되돌림
  // const handleQuitEdit = () => {
  //   setEdit(false);
  //   setLocalProduct(title);
  // };


  // const [localProduct, setLocalProduct] = useState(title);

  // const localProductInput = useRef();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [attend, setAttend] = useState("");
  const [places, setPlaces] = useState("");
  const [receptTime, setReceptTime] = useState("");


  useEffect(() => {
    if (product) {
      setImage(product.image || "");
      setTitle(product.title || "");
      setContent(product.content || "");
      setPrice(product.price || "");
      setAttend(product.attend || "");
      setPlaces(product.places || "");
      setReceptTime(product.receptTime || "");
    }
  }, [product]);

  // 수정
  const handleEdit = async () => {
    try {
      await axiosInstance.put(`/products/${product.id}`, {
        image,
        title,
        content,
        price,
        attend,
        places,
        receptTime,
      });
      navigate(`/products/${product.id}`); // 성공 시 제품 상세 페이지로 리다이렉트
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* <form> */}
        <div className="relative w-[60%] flex flex-col justify-center items-start border-b border-gray-300 mb-8">
          <h1 id="상품 정보" className="text-2xl">
            상품 정보 수정
          </h1>
        </div>

        <div className="w-[80%] max-w-4xl flex flex-col justify-center items-start p-1.5">
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
                // defaultValue={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="상품 설명"
              htmlFor="content"
              className="text-base font-medium text-left pr-2.5"
            >
              상품 설명
            </label>
            <div className="w-full">
              <textarea
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md h-[100px] border border-gray-400"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={attend}
                onChange={(e) => setAttend(e.target.value)}
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
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center mb-5">
            <label
              id="수령 닐짜"
              htmlFor="receptTime"
              className="text-base font-medium text-left pr-2.5"
            >
              수령 날짜
            </label>
            <div className="w-full">
              <input
                className="w-full text-sm font-normal text-gray-800 p-2.5 rounded-md border border-gray-400"
                type="text"
                value={receptTime}
                onChange={(e) => setReceptTime(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            {/* <button 
            className="mt-12 mr-8 w-[40%] h-12 border-none text-base font-bold bg-[#b7b7b7] rounded-md text-white hover:bg-[#8186CB]"
            type="submit"
            onClick={handleQuitEdit}
          >
            수정 취소
          </button> */}
          <button 
            className="mt-12 ml-8 w-[40%] h-12 border-none text-base font-bold bg-[#2B0585] rounded-md text-white hover:bg-[#8186CB]"
            type="submit"
            onClick={handleEdit}
          >
            수정하기
          </button>
          </div>
       
      </div>
    {/* </form> */}
  </div>
  );
};

export default EditProductPage;