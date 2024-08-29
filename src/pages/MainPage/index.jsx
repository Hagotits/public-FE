import React, { useEffect, useState, useCallback } from "react";
import SearchInput from "./Sections/SearchInput";
import axiosInstance from "../../utils/axios";
import CardItem from "./Sections/CardItem";
import debounce from "lodash/debounce";

const MainPage = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      searchTerm,
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
      searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  // 디바운스된 검색어 처리 함수
  const debouncedFetchProducts = useCallback(
    debounce((searchTerm) => {
      fetchProducts({ skip: 0, limit, searchTerm });
      setSkip(0);
    }, 300),
    []
  );

  const handleSearchTerm = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedFetchProducts(value);
  };

  return (
    <div className="w-[60%] p-3 sm:p-5 mx-auto">
      {/* max-w-screen-sm */}
      <div className="flex justify-end mb-3">
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>
      <div className="w-full h-auto grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <CardItem product={product} key={product.id} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
