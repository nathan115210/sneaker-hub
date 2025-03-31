import { useEffect, useState } from "react";
import type { ProductProps } from "../../../../types/productTypes.ts";
import ProductCard from "../ProductCard/ProductCard.tsx";
import "./ProductList.scss";

const ProductList = ({ isAdmin }: { isAdmin?: boolean }) => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = () => {
      fetchProducts()
        .then((data) => setProducts(data))
        .catch((err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        });
    };

    loadProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <h2>No products yet</h2>;
  }

  return (
    <ul className={"product-list"}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
      ))}
    </ul>
  );
};

export default ProductList;

const fetchProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/shop/all-products`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
