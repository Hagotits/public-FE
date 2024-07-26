import React, { useEffect, useState } from "react";
import SearchInput from "./Sections/SearchInput";
import axiosInstance from "../../utils/axios";
import CardItem from "./Sections/CardItem";

const MainPage = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    places: [],
  });

  useEffect(() => {
    fetchArticles({ skip, limit });
  }, []);

  const fetchArticles = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };

    try {
      const response = await axiosInstance.get("/articles", { params });

      if (loadMore) {
        setArticles([...articles, ...response.data.articles]);
      } else {
        setArticles(response.data.articles);
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
      filters,
      searchTerm,
    };
    fetchArticles(body);
    setSkip(skip + limit);
  };

  // const showFilteredResults = (filters) => {
  //   const body = {
  //     skip: 0,
  //     limit,
  //     filters,
  //     searchTerm,
  //   };
  //   fetchArticles(body);
  //   setSkip(0);
  // };

  const handleSearchTerm = (event) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: event.target.value,
    };
    fetchArticles(body);
    setSearchTerm(event.target.value);
    setSkip(0);
  };

  return (
    <section>
      <div className="flex justify-end mb-3">
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {articles.map((article) => (
          <CardItem article={article} key={article.id} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500">더 보기</button>
        </div>
      )}
    </section>
  );
};

export default MainPage;