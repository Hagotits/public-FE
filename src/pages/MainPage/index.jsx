import React, { useEffect, useState } from "react";
import SearchInput from "./Sections/SearchInput";
import axiosInstance from "../../utils/axios";
import "../../style/Main.css";
import CardItem from "./Sections/CardItem";

const MainPage = () => {
  const limit = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({});

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

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm,
    };
    fetchArticles(body);
    setSkip(0);
  };

  const handleSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: newSearchTerm,
    };
    fetchArticles(body);
    setSkip(0);
  };

  return (
    <div>
      <div>
        <h2>공동구매 마켓</h2>
      </div>

      <div>
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      <div>
        {articles.map((article) => (
          <CardItem article={article} key={article.id} />
        ))}
      </div>

      {hasMore && (
        <div>
          <button onClick={handleLoadMore}>더 보기</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
