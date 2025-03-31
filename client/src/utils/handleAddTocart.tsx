const handleAddToCart = async (productId: string, productPrice: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/shop/cart/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productPrice }),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }
    console.log("Product added to cart successfully");
    window.location.href = "/cart";
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

export default handleAddToCart;
