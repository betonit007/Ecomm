import { formatMoney } from "../../utils/money";

export const ProductInfo = ({ product, quantity, setQuantity }) => {
  const handleQuantityChange = (event) => {
    const quantitySelected = parseInt(event.target.value, 10);
    setQuantity(quantitySelected);
  };

  return (
    <>
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <span className="product-rating-stars-text">
          {product.rating.stars}
        </span>
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="product-rating-stars"
        />
        <div className="product-rating-count link-primary">
          {product.ratingCount}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map((i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>
    </>
  );
};
