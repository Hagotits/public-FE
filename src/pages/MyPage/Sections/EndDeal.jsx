import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

const EndDeal = () => {
  // 상품 데이터는 Redux 또는 API로 받아오는 부분을 가정
  const userId = useSelector((state) => state.user?.userData?.id);
  const products = [
    {
      id: 1,
      buyer: "구매자A",
      seller: "판매자A",
      participants: 5,
      price: 30000,
      place: "서울",
      soldOut: true,
    },
    // 더미 데이터 추가
    {
      id: 2,
      buyer: "구매자B",
      seller: "판매자B",
      participants: 10,
      price: 50000,
      place: "부산",
      soldOut: true,
    },
  ];

  const Price = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleDelete = (id) => {
    // 삭제 핸들러 로직 추가 필요
    console.log(`Item with ID ${id} deleted`);
  };

  const handleEdit = (id) => {
    // 수정 핸들러 로직 추가 필요
    console.log(`Edit item with ID ${id}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <h2 className="text-xl font-bold mb-5 text-center">거래 완료</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                <p className="text-lg font-semibold">구매자: {item.buyer}</p>
                <p className="text-sm text-gray-600">판매자: {item.seller}</p>
                <p className="text-sm text-gray-600">
                  참여 인원: {item.participants}명
                </p>
                <p className="text-sm text-gray-600">
                  가격: {Price(item.price)} 원
                </p>
                <p className="text-sm text-gray-600">장소: {item.place}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <IoPencilOutline size={18} className="mr-2" />
                  수정
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <IoTrashOutline size={18} className="mr-2" />
                  삭제
                </button>
                <Link
                  to={`/review/${item.id}`}
                  className="flex items-center text-green-500 hover:text-green-700"
                >
                  <IoPencilOutline size={18} className="mr-2" />
                  리뷰쓰기
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          거래 완료된 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default EndDeal;
