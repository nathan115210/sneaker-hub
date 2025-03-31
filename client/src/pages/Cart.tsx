import "./Cart.scss";
import { useEffect, useState } from "react";

import type { CartType } from "../../../types/cartTypes.ts";
import deleteProduct from "../utils/deleteProduct.tsx";

const Cart = () => {
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCart = () => {
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/shop/cart/all-products`)
        .then((response) => {
          console.log("response", response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Received non-JSON response");
          }
          return response.json();
        })
        .then((data) => {
          setCartData(data);
        })
        .catch((err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        });
    };
    loadCart();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!cartData) {
    return <h1>Cart is Empty</h1>;
  }

  const { products, totalPrice } = cartData;

  return (
    <section className={"cart-page"}>
      <h2 className={"page-heading"}>Shopping Cart</h2>
      <div className="cart-container">
        <ul className="cart-items">
          {products.map((product, index) => {
            const { id, name, price, description, imageUrl, qty } = product;
            return (
              <li className="cart-item" key={`${index}-${id}`}>
                <img src={imageUrl} alt={name} />
                <div className="cart-item-details">
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <p>€ {price}</p>
                  <p>Quantity: {qty}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() =>
                      deleteProduct(
                        product.id,
                        "/api/shop/cart/delete-product",
                        "/cart",
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <p>Total: {totalPrice}</p>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
