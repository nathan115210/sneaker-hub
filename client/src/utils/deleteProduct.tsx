const deleteProduct = async (
  productId: string,
  endPoint: string,
  navigateTo: string,
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}${endPoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    console.log("Product deleted successfully");
    window.location.href = navigateTo;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export default deleteProduct;
