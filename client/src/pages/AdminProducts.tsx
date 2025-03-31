import { Suspense } from "react";
import ProductList from "../components/ProductList/ProductList.tsx";

const AdminProducts = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductList isAdmin />
    </Suspense>
  );
};
export default AdminProducts;
