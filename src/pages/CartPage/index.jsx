import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  payProducts,
  removeCartItem,
} from "../../redux/thunkFunctions";
import CartTable from "./Sections/CartTable";
import { toast } from "react-toastify";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail || []);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItemIds = [];

    if (userData?.cart && userData.cart.length > 0) {
      // 잘못된 연산자를 수정
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart,
      };

      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    setTotal(total);
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
    localStorage.removeItem(`like-${productId}`);
    toast.info("찜 목록에서 제거되었습니다.");
  };

  const handlePaymentClick = () => {
    dispatch(payProducts({ cartDetail }));
  };

  return (
    <div>
      {cartDetail.length > 0 ? (
        <>
          <CartTable
            products={cartDetail}
            onRemoveItem={handleRemoveCartItem}
          />
          <div className="mt-10">
            <p>
              <span className="font-bold">합계:</span>
              {total} 원
            </p>
            <button
              className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
              onClick={handlePaymentClick}
            >
              결제하기
            </button>
          </div>
        </>
      ) : (
        <p>관심 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default CartPage;
