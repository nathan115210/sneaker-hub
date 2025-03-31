import "./AddProducts.scss";
import ProductForm from "../components/ProductForm/ProductForm.tsx";

const AddProducts = () => {
  return (
    <>
      <h2 className={"page-heading"}>Add new Product</h2>
      <ProductForm
        apiEndPoint={"/api/admin/add-product"}
        redirectTo={"/"}
        buttonLabel={"Add"}
      />
    </>
  );
};
export default AddProducts;
