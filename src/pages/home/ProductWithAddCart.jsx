import { useState } from "react";
import { ProductInfo } from "./ProductInfo";
import { AddToCartButton } from "./AddToCartButton";

export const ProductWithAddCart = ({ product, loadCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className="product-container"
      data-testid="product-container"
      key={product.id}
    >
      <ProductInfo
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <AddToCartButton
        loadCart={loadCart}
        productId={product.id}
        quantity={quantity}
      />
    </div>
  );
};
