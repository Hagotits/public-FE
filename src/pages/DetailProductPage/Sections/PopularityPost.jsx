import React, { useState, useEffect } from "react";
import CardItem from "../../MainPage/Sections/CardItem";
import axiosInstance from "../../../utils/axios";
import { Link } from "react-router-dom";

const PopularityPost = () => {
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({ skip, limit, loadMore = false }) => {
    const params = {
      skip,
      limit,
    };

    try {
      const response = await axiosInstance.get("/products", { params });

      if (loadMore) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  return (
    <div className="py-[40px]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">인기 게시물</h3>
        <button className="text-[#2B0585] hover:font-bold">
          <Link to={"/"}>더 구경하기</Link>
        </button>
      </div>

      {/* 그리드 레이아웃 정의 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <div className="mt-10 bg-auto" key={product.id}>
            <CardItem product={product} />
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-500"
          >
            더 보기
          </button>
        </div>
      )}

      {/* 추가 콘텐츠 */}
      <div className="mt-10 text-gray-600">
        여긴 찜 갯수 n개 이상인 게시물 띄우기 (하면 될 듯?)
      </div>
    </div>
  );
};

export default PopularityPost;
