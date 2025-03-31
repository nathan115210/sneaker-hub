import ProductForm from "../components/ProductForm/ProductForm.tsx";
import useGetProductById from "../utils/useGetProductById.tsx";

const EditProduct = () => {
  const { loading, product, error } = useGetProductById();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <h2 className={"page-heading"}>Edit Product</h2>
      <ProductForm
        apiEndPoint={"/api/admin/edit-product"}
        redirectTo={"/admin-products"}
        buttonLabel={"Edit"}
        prevProduct={product}
      />
    </>
  );
};
export default EditProduct;
