import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ArticleImage from "./Sections/ArticleImage";
import "../../style/Articles.css";
import dayjs from "dayjs";

const DetailArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(
          `/articles/${articleId}?type=single`
        );
        console.log(response.data);
        const articleData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setArticle(articleData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, [articleId]);

  if (!article) return null;

  return (
    <div className="ArticlesPage">
      {article && (
        <div key={article.id} className="ArticlesSub">
          <div className="IMG">
            <ArticleImage article={article} />
          </div>
          <div className="user">
            <div className="userIcon"></div>
            <div className="userINfo">
              <div className="ab">{article.userId}</div>
              <div className="bc">{article.place}</div>
            </div>
          </div>

          <div className="POST">
            <div className="TITLE">{article.title}</div>
            <div className="PRICE">{article.price}원</div>
            <div className="EXPLAN">{article.content}</div>
          </div>
          <div className="LEFTOVER">
            <div className="GRAY">
              <div className="person">{article.attend - 1}명 남음</div>
              <div className="time">
                {dayjs(article.receptTime).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
            <div className="BUTTON">
              <button className="BTN">
                {Math.floor(article.price / article.attend)}원으로 참여하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailArticlePage;
