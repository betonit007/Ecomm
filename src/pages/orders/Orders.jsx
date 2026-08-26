import Header from "../../components/Header";
import "./Orders.css";
import { OrderItems } from "./OrderItems";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

function Orders({ cartItems }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders?expand=products")
      .then((response) => setOrders(response.data));
  }, []);

  return (
    <>
      <Header cart={cartItems} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format("MMMM D, YYYY")}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{`$${formatMoney(order.totalCostCents)}`}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>
              <OrderItems order={order} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
