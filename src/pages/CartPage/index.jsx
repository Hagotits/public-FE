import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  removeCartItem,
} from "../../redux/thunkFunctions";
import CartTable from "./Sections/CartTable";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail || []);
  const dispatch = useDispatch();

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

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  };


  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">찜 목록</h2>
      </div>

      {cartDetail.length > 0 ? (
        <>
          <CartTable
            products={cartDetail}
            onRemoveItem={handleRemoveCartItem}
          />
        </>
      ) : (
        <p>찜목록이 없습니다.</p>
      )}
    </section>
  );
};

export default CartPage;