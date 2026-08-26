import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export const DeliveryOptions = ({
  deliveryOptions = [],
  cartItem,
  loadCart,
}) => {
  const updateDeliveryOption = async (optionId) => {
    console.log("CART ITEM ID", cartItem.id);
    try {
      await axios.put(`/api/cart-items/${cartItem.id}`, {
        deliveryOptionId: optionId,
      });
      if (typeof loadCart === "function") {
        loadCart();
      }
    } catch (error) {
      console.error("Failed to update delivery option:", error);
    }
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions?.map((option) => (
        <div className="delivery-option" key={option.id}>
          <input
            className="delivery-option-date"
            type="radio"
            checked={option.id === cartItem.deliveryOptionId}
            name={`delivery-option-${cartItem.productId}`}
            onChange={() => updateDeliveryOption(option.id)}
          />
          <span className="delivery-option-date">
            {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </span>
          <span className="delivery-option-estimated-time">
            {option.estimatedDeliveryTime}
          </span>
          <div className="delivery-option-price">
            {option.priceCents > 0
              ? `$${formatMoney(option.priceCents)}`
              : "Free Shipping"}
          </div>
        </div>
      ))}
    </div>
  );
};
