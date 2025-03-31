import React, { useId, useState } from "react";
import { ProductProps } from "../../../../types/productTypes.ts";
import { useNavigate } from "react-router-dom";
import "./ProductForm.scss";

export interface ProductFormProps {
  apiEndPoint: string;
  redirectTo: string;
  buttonLabel: string;
  prevProduct?: ProductProps;
}

const ProductForm = (props: ProductFormProps) => {
  const { apiEndPoint, redirectTo, buttonLabel, prevProduct } = props;

  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [product, setProduct] = useState<ProductProps>(
    prevProduct || {
      id: id,
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
    },
  );
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}${apiEndPoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        },
      );

      if (response.ok) {
        // Redirect to the Home page upon successful submission
        navigate(redirectTo);
      } else {
        // Handle errors or unsuccessful submissions
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};
export default ProductForm;
