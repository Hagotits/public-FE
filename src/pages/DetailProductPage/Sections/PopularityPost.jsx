import React from 'react';
import MainPage from '../../MainPage/index';
import CardItem from '../../MainPage/Sections/CardItem';
import { useNavigate } from 'react-router-dom';

const PopularityPost = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex py-[40px] justify-between">
        <h3 className="text-lg font-semibold">인기 게시물</h3>
        <button
          className="text-[#2B0585] hover:text-bold right-0"
          onClick={() => navigate("/")}>더 구경하기</button>
      </div>
      <div>여긴 찜 갯수 n개 이상인 게시물 띄우기(하면 될 듯?)
        <div>{CardItem}</div>
      </div>
    </div>
  );
};

export default PopularityPost;