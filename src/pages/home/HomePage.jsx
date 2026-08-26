import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import Header from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cartItems = [], loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get("api/products");
      setProducts(res.data);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Header cart={cartItems} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;
