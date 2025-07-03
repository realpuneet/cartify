import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Product = lazy(() => import("../pages/Product"));
const About = lazy(() => import("../pages/About"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Signin = lazy(() => import("../pages/users/Signin"));
const Signup = lazy(() => import("../pages/users/Signup"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const UserSettings = lazy(() => import("../pages/UserSettings"));
const Cart = lazy(() => import("../pages/Cart"));
const UnAuth = lazy(() => import("./UnAuth"));
const Auth = lazy(() => import("./auth"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));


const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />

        <Route
          path="/signin"
          element={
            <UnAuth>
              <Signin />
            </UnAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <UnAuth>
              <Signup />
            </UnAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <Auth>
              <UserSettings />
            </Auth>
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <Auth>
              <ProductDetails />
            </Auth>
          }
        />
        <Route
          path="/cart"
          element={
            <Auth>
              <Cart />
            </Auth>
          }
        />

        <Route
          path="create-product"
          element={
            <Auth>
              <CreateProduct />
            </Auth>
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default MainRoute;
