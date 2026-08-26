import { useState } from "react";
import axios from "axios";

export const UpdateCart = ({ cartItem, loadCart }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart-items/${cartItemId}`);
      loadCart();
    } catch (error) {
      console.error("Failed to delete cart item", error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, quantity) => {
    try {
      await axios.put(`/api/cart-items/${cartItemId}`, { quantity });
      loadCart();
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    }
  };

  return (
    <div className="product-quantity">
      <span>
        Quantity:{" "}
        <input
          className="quantity-label"
          type="number"
          min="1"
          max="20"
          defaultValue={cartItem.quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </span>
      <span
        className="update-quantity-link link-primary"
        onClick={() => updateCartItemQuantity(cartItem.id, quantity)}
      >
        Update
      </span>
      <span
        onClick={() => deleteCartItem(cartItem.id)}
        className="delete-quantity-link link-primary"
      >
        Delete
      </span>
    </div>
  );
};
