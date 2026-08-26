import { Routes, Route } from "react-router";
import "./App.css";
import { HomePage } from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Orders from "./pages/orders/Orders";
import { useEffect, useState } from "react";
import axios from "axios";

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
          path="checkout"
          element={<CheckoutPage cartItems={cartItems} loadCart={loadCart} />}
        />
        <Route path="orders" element={<Orders cartItems={cartItems} />} />
      </Routes>
    </>
  );
}

export default App;
