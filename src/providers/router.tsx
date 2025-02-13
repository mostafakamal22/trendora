import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Start-up components
import MainLayout from "../components/MainLayout/MainLayout";

// Lazy-loaded components
const Home = lazy(() => import("../components/Home/Home"));
const Products = lazy(() => import("../components/Products/Products"));
const Categories = lazy(() => import("../components/Categories/Categories"));
const Brands = lazy(() => import("../components/Brands/Brands"));
const NotFound = lazy(() => import("../components/NotFound/NotFound"));
const Register = lazy(() => import("../components/Register/Register"));
const Login = lazy(() => import("../components/Login/Login"));
const ForgotPassword = lazy(
  () => import("../components/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../components/ResetPassword/ResetPassword")
);
const ProductDetails = lazy(
  () => import("../components/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("../components/Cart/Cart"));
const WishList = lazy(() => import("../components/WishList/WishList"));
const Checkout = lazy(() => import("../components/Checkout/Checkout"));
const Orders = lazy(() => import("../components/Orders/Orders"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/wishList",
        Component: WishList,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/productDetails/:id",
        Component: ProductDetails,
      },
      {
        path: "/categories",
        Component: Categories,
      },
      {
        path: "/brands",
        Component: Brands,
      },
      {
        path: "/check-out/:id",
        Component: Checkout,
      },
      {
        path: "allorders",
        Component: Orders,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/reset-password",
        Component: ResetPassword,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
