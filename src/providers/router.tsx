import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import MainLayout from "../components/MainLayout/MainLayout";
import Cart from "../components/Cart/Cart";
import WishList from "../components/WishList/WishList";
import Products from "../components/Products/Products";
import Categories from "../components/Categories/Categories";
import Brands from "../components/Brands/Brands";
import NotFound from "../components/NotFound/NotFound";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Checkout from "../components/Checkout/Checkout";
import Orders from "../components/Orders/Orders";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";

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
