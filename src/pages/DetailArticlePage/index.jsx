import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ArticleImage from "./Sections/ArticleImage";
import ArticleInfo from "./Sections/ArticleInfo";
import "../../style/Articles.css"

const DetailArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    console.log("articleId:", articleId); // articleId 값 확인

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

    if (articleId) {
      fetchArticle();
    }
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
              <div className="person">{article.attend -1}명 남음</div>
              <div className="time">{article.receptTime}</div>
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
