import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import "../../style/Write.css";
import DetailArticlePage from "../DetailArticlePage/index";

const places = [
  { key: 0, value: "선택해주세요." },
  { key: 1, value: "신촌 세븐 앞" },
  { key: 2, value: "신촌 짱돌 앞" },
  { key: 3, value: "단월 농협 앞" },
  { key: 4, value: "모시래 세븐 앞" },
  { key: 5, value: "모시래 기숙사 여동 앞" },
  { key: 6, value: "모시래 기숙사 남동 앞" },
  { key: 7, value: "해오름 기숙사 여동 앞" },
  { key: 8, value: "해오름 기숙사 남동 앞" },
];

const UploadArticlePage = () => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    places: 1,
    price: 0,
    attend: 0,
    images: [],
    receptTime: "",
  });
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = (newImages) => {
    setArticle((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      userId: userData.id,
      ...article,
    };

    try {
      const response = await axiosInstance.post("/articles", body);
      const newArticleId = response.data.articleId;
      if (response.data === 200) {
        navigate(`/articles/${newArticleId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="UploadPage">
      <div className="UploadTitle">
        <h1>상품 정보</h1>
      </div>

      <div className="UploadContent">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Img">상품 이미지</label>
            <FileUpload images={article.images} onImageChange={handleImages} />
          </div>
          <div>
            <label htmlFor="title">상품명</label>
            <input
              name="title"
              className="productTitle"
              onChange={handleChange}
              value={article.title}
            />
          </div>

          <div>
            <label htmlFor="content">설명</label>
            <input
              name="content"
              id="content"
              onChange={handleChange}
              value={article.content}
            />
          </div>

          <div>
            <label htmlFor="price">가격</label>
            <input
              name="price"
              type="number"
              id="price"
              onChange={handleChange}
              value={article.price}
            />
          </div>

          <div>
            <label htmlFor="attend">거래 인원</label>
            <input
              name="attend"
              type="number"
              id="attend"
              onChange={handleChange}
              value={article.attend}
            />
          </div>

          <div>
            <label htmlFor="place">거래 장소</label>
            <select
              name="places"
              id="places"
              onChange={handleChange}
              value={article.places}
            >
              {places.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>수령 날짜</label>
            <input
              type="datetime-local"
              name="receptTime"
              id="receptTime"
              onChange={handleChange}
              value={article.receptTime}
            />
          </div>

          <div className="productUploadBtn">
            <button className="productBtn" type="submit">
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadArticlePage;
