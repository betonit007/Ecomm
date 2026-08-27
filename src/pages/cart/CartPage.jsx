import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

import { Link } from "react-router";
import axios from "axios";
import "./CartPage.css";
import "./CartHeader.css";

function CartPage({ cartItems = [], loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    axios
      .get("/api/payment-summary")
      .then((response) => setPaymentSummary(response.data));
  }, [cartItems]);

  useEffect(() => {
    axios
      .get("api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => setDeliveryOptions(response.data));
  }, []);

  return (
    <>
      <title>Checkout</title>
      <div>
        {" "}
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <a href="/">
                <img className="logo" src="images/logo.png" />
                <img className="mobile-logo" src="images/mobile-logo.png" />
              </a>
            </div>

            <div className="checkout-header-middle-section">
              Cart (
              <Link className="return-to-home-link" to="/">
                {totalQuantity} items
              </Link>
              )
            </div>

            <div className="checkout-header-right-section">
              <img src="images/icons/checkout-lock-icon.png" />
            </div>
          </div>
        </div>
        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <OrderSummary
              cartItems={cartItems}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
            <div className="payment-summary">
              <div className="payment-summary-title">Payment Summary</div>
              {paymentSummary && (
                <PaymentSummary
                  paymentSummary={paymentSummary}
                  totalQuantity={totalQuantity}
                  loadCart={loadCart}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
