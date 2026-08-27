import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { UpdateCart } from "./UpdateCartMenu";

export const OrderSummary = ({
  cartItems = [],
  deliveryOptions = [],
  loadCart,
}) => {
  return (
    <div className="order-summary">
      {deliveryOptions &&
        cartItems?.map((cartItem) => {
          return (
            <div className="cart-item-container" key={cartItem.id}>
              <div className="delivery-date">
                {`Delivery date: ${deliveryOptions.find((opt) => opt.id === cartItem.deliveryOptionId)?.estimatedDeliveryTimeMs ? dayjs(deliveryOptions.find((opt) => opt.id === cartItem.deliveryOptionId)?.estimatedDeliveryTimeMs).format("dddd, MMMM D") : "N/A"}`}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <UpdateCart cartItem={cartItem} loadCart={loadCart} />
                </div>
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
