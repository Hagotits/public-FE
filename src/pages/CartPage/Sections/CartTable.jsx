import React from "react";

const CartTable = ({ products, onRemoveItem }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:4000/${image}`;
    }
    return null;
  };

  const renderItems =
    products.length > 0 &&
    products.map((product) => (
      <tr key={product.id}>
        <td>
          <img
            className="w-[70px]"
            alt="product"
            src={renderCartImage(product.images)}
          />
        </td>
        <td>{product.quantity} 명</td>
        <td>{product.price}원</td>
        
        <td>
          <button onClick={() => onRemoveItem(product.id)}>지우기</button>
        </td>
      </tr>
    ));

  return (
    <table>
      <tbody>{renderItems}</tbody>
    </table>
  );
};

export default CartTable;
