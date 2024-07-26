import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ArticleImage from "./Sections/ArticleImage";
import ArticleInfo from "./Sections/ArticleInfo";

const DetailArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(
          `articles/${articleId}?type=single`
        );
        console.log(response.data);
        setArticle(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, [articleId]);

  if (!article) return null;

  return (
    <div>
      <div>
        <h1>{article.title}</h1>
      </div>

      <div>
        <div>
          {/* {ProductImage} */}
          <ArticleImage article={article} />
        </div>
        <div>
          {/* {ProductInfo} */}
          <ArticleInfo article={article} />
        </div>
      </div>
    </div>
  );
};

export default DetailArticlePage;
