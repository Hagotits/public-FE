import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

const DetailProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/${productId}?type=single`
        );
        const productData = Object(response.data)
          ? response.data[0]
          : response.data;
        console.log(productData);
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {product && (
        <div key={product.id} className="relative w-[700px] h-[90%]">
          <div
            id="이미지"
            className="w-full h-[400px] rounded-[15px] border border-[#c5c5c5] overflow-hidden"
          >
            <ProductImage product={product} />
          </div>
          <div>
            <ProductInfo product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProductPage;
