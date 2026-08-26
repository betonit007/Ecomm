import React from "react";
import dayjs from "dayjs";

export const OrderItems = ({ order }) => {
  return order?.products?.length > 0 ? (
    <div className="order-details-grid">
      {order.products.map((product) => (
        <React.Fragment key={product.id}>
          <div className="product-image-container">
            <img src={product.product.image} />
          </div>

          <div className="product-details">
            <div className="product-name">{product.product.name}</div>
            <div className="product-delivery-date">
              Arriving on:{" "}
              {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
            </div>
            <div className="product-quantity">Quantity: {product.quantity}</div>
            <button className="buy-again-button button-primary">
              <img
                className="buy-again-icon"
                src="images/icons/buy-again.png"
              />
              <span className="buy-again-message">Add to Cart</span>
            </button>
          </div>

          <div className="product-actions">
            <a href="/tracking">
              <button className="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </React.Fragment>
      ))}
    </div>
  ) : null;
};
