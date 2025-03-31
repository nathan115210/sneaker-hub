import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import AddProducts from "./pages/AddProducts.tsx";
import NotFound from "./pages/NotFound.tsx";
import Nav from "./components/Nav/Nav.tsx";
import AdminProducts from "./pages/AdminProducts.tsx";
import Orders from "./pages/Orders.tsx";
import ProductDetail from "./pages/ProductDetails.tsx";
import Cart from "./pages/Cart.tsx";
import EditProduct from "./pages/EditProduct.tsx";

export interface RouteProps {
  path: string;
  element: JSX.Element;
  name: string;
  showOnNav?: boolean;
}

const routes = [
  { path: "/", element: <Home />, name: "Home" },
  { path: "/add-products", element: <AddProducts />, name: "Add Products" },
  { path: "/users", element: <Users />, name: "Users" },
  {
    path: "/admin-products",
    element: <AdminProducts />,
    name: "Admin Products",
  },
  { path: "/order", element: <Orders />, name: "Orders" },
  { path: "/cart", element: <Cart />, name: "Cart" },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
    name: "Product Detail",
    showOnNav: false,
  },
  {
    path: "/edit-product/:productId",
    element: <EditProduct />,
    name: "Edit product",
    showOnNav: false,
  },
];

function App() {
  return (
    <Router>
      <Nav routes={routes} />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
