import { useState } from "react";
import axios from "axios";

export const AddToCartButton = ({ loadCart, productId, quantity }) => {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    await axios.post("api/cart-items", {
      productId: productId,
      quantity: quantity,
    });
    await loadCart();
    setLoading(false);
  };

  return (
    <button
      onClick={addToCart}
      data-testid="add-to-cart-button"
      disabled={loading}
      className="add-to-cart-button button-primary"
    >
      Add to Cart
    </button>
  );
};
