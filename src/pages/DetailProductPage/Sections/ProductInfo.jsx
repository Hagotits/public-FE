import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ({ product }) => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }))
  }

  return (
    <div>
      <p>상품 정보</p>

      <ul>
        <li>{product.title}</li>
        <li><span>인원: </span>{product.person}명</li>
        <li><span>수령 날짜: </span>{product.date}</li>
        <li><span>수령 장소: </span>{product.place}</li>
        <li><span>가격: </span>{product.price}원</li>
        <li>{product.explan}</li>
      </ul>

      <div>
        <button
          onClick={handleClick}
        >
          {product.price / product.person}로 참여하기
        </button>
      </div>
    </div>
  )
}

export default ProductInfo;