import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductsGrid } from "./ProductsGrid";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { AddToCartButton } from "./AddToCartButton";

vi.mock("axios");

let loadCart;

describe("Product", () => {
  let product;
  beforeEach(() => {
    product = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87,
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"],
      },
    ];
    loadCart = vi.fn();
  });

  it("renders correctly", () => {
    render(<ProductsGrid products={product} loadCart={vi.fn()} />);
    expect(screen.getByText(product[0].name)).toBeInTheDocument();
    expect(screen.getByText("10.90")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      product[0].image,
    );
    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      `images/ratings/rating-45.png`,
    );
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    const product = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87,
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"],
      },
    ];
    render(
      <AddToCartButton
        productId={product[0].id}
        quantity={1}
        loadCart={loadCart}
      />,
    );

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("api/cart-items", {
      productId: product[0].id,
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });
});
