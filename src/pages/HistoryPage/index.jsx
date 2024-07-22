import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const HistoryPage = () => {
  const userData = useSelector((state) => state.user?.userData);

  return (
    <section>
      <div>
        <h2>History</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {userData?.history?.length > 0 ? (
            userData.history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  {dayjs(item.dateOfPurchase).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No purchase history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default HistoryPage;
