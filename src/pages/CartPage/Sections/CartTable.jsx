import React from "react";
import CardItem from "../../MainPage/Sections/CardItem";

const CartTable = ({ products, onRemoveItem }) => {
  const renderItems = 
    products.length > 0 &&
    products.map((product) => (
      <CardItem product={product} key={product.id} />
    ));

    return (
      <div className="max-w-screen-sm mx-auto p-5">
        <div className="w-full h-auto grid grid-cols-2 gap-4 sm:grid-cols-4">
          {renderItems}
        </div>
      </div>
    )
};

export default CartTable;
