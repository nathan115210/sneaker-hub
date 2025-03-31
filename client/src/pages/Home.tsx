import { Suspense } from "react";
import ProductList from "../components/ProductList/ProductList.tsx";

const Home = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductList />
    </Suspense>
  );
};
export default Home;
