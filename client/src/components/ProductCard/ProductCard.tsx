import React from "react";
import type { ProductProps } from "../../../../types/productTypes.ts";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import handleAddToCart from "../../utils/handleAddTocart.tsx";
import deleteProduct from "../../utils/deleteProduct.tsx";

const ProductCard: React.FC<{ product: ProductProps; isAdmin?: boolean }> = ({
  product,
  isAdmin,
}) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        {isAdmin ? (
          <div className={"button-group"}>
            <Link
              to={"/edit-product/" + product.id}
              className="product-card-button edit-product-button"
            >
              Edit
            </Link>
            <button
              onClick={() =>
                deleteProduct(
                  product.id,
                  "/api/admin/delete-product",
                  "/admin-products",
                )
              }
              className="product-card-button remove-product-button"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className={"button-group"}>
            <Link
              className="product-card-button detail-button"
              to={"/product/" + product.id}
            >
              Detail
            </Link>
            <button
              onClick={() => handleAddToCart(product.id, product.price)}
              className="product-card-button add-to-cart-button"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
