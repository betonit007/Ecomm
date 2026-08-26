import { ProductWithAddCart } from "./ProductWithAddCart";

export function ProductsGrid({ products = [], loadCart }) {
  return (
    <div className="products-grid">
      {products?.map((product) => (
        <ProductWithAddCart
          key={product.id}
          product={product}
          loadCart={loadCart}
        />
      ))}
    </div>
  );
}
