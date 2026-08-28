import { Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { HomePage } from "./pages/home/HomePage";
import CartPage from "./pages/cart/CartPage";
import Orders from "./pages/orders/Orders";
import LoginRegisterPage from "./pages/auth/LoginRegisterPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PaymentSuccessPage from "./pages/checkout/PaymentSuccessPage";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("api/cart-items?expand=product");
    console.log("loadCArt res >>> ", response);
    setCartItems(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={<HomePage cartItems={cartItems} loadCart={loadCart} />}
        />
        <Route
          path="cart"
          element={<CartPage cartItems={cartItems} loadCart={loadCart} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="checkout"
            element={<CheckoutPage cartItems={cartItems} loadCart={loadCart} />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="orders" element={<Orders cartItems={cartItems} />} />
        </Route>
        <Route path="auth" element={<LoginRegisterPage />} />
        <Route path="success" element={<PaymentSuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
