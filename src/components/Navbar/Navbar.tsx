import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { Cart, LoginResponse } from "@/types";
import { BsCart } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

import fetchData from "@/utils/fetchData";
import logo from "@/assets/images/logo-1.png";
import MobileNavigation from "./MobileNavigation";

const routes = [
  { path: "/home", label: "Home" },
  { path: "/cart", label: "Cart" },
  { path: "/wishlist", label: "Wishlist" },
  { path: "/products", label: "Products" },
  { path: "/categories", label: "Categories" },
  { path: "/brands", label: "Brands" },
  { path: "/allorders", label: "Orders" },
];

export default function Navbar() {
  const [token, setToken] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");
  const [user, setUser] = useLocalStorage<LoginResponse["user"] | null>("user");

  const [isOpen, setIsOpen] = useState(false);

  const pathname = useLocation()?.pathname;

  const navigate = useNavigate();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetchData<Cart>({
        url: "/cart",
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  function handleLogout() {
    setToken(null);
    setUserId(null);
    setUser(null);

    navigate("/");
  }

  return (
    <FlowbiteNavbar
      className="border-b-primary-peach"
      border
      theme={{
        collapse: {
          base: "w-full lg:block lg:w-auto",
          list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium",
        },
        link: {
          base: "block py-2 pl-3 pr-4 lg:p-0 transition-all duration-200 ease-in-out font-playfair font-bold uppercase",
          active: {
            on: "bg-primary-default text-white dark:text-white lg:bg-transparent lg:text-primary-default",
            off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:hover:bg-transparent lg:hover:text-primary-default lg:dark:hover:bg-transparent lg:dark:hover:text-white",
          },
        },
        toggle: {
          base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden",
        },
      }}
    >
      <Link to="/">
        <FlowbiteNavbar.Brand as={"div"} className="gap-1 select-none">
          <img src={logo} className="h-6 sm:h-9" alt="Logo" />
          <h2 className="uppercase bg-gradient-to-tr from-primary-default to-primary-sunset bg-clip-text text-transparent drop-shadow">
            Trendora
          </h2>
        </FlowbiteNavbar.Brand>
      </Link>

      {token ? (
        <>
          <div className="flex lg:order-2 lg:items-center gap-2 lg:gap-4">
            <Link to="/cart" className="relative" title="Shoping Cart Items">
              <BsCart className="text-gray-400" size={30} />

              <span className="h-5 w-5 flex justify-center items-center absolute right-0 bottom-0 lg:-bottom-1 lg:-right-1 bg-primary-default text-white font-semibold text-xs p-1 rounded-full shadow">
                {cartData?.numOfCartItems ?? "-"}
              </span>
            </Link>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  className="border border-transparent hover:border-primary-default rounded-full transition-all duration-200 ease-in-out"
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
              theme={{
                inlineWrapper: "hidden lg:flex items-center",
              }}
            >
              <Dropdown.Header>
                <span className="block text-sm truncate">
                  {user?.name || "N/A"}
                </span>
                <span className="max-w-[200px] block truncate text-sm font-medium">
                  {user?.email || "N/A"}
                </span>
              </Dropdown.Header>

              <Dropdown.Item>
                <Link to="/setting" className="w-full text-left">
                  Settings
                </Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item className="text-red-500" onClick={handleLogout}>
                Sign out
              </Dropdown.Item>
            </Dropdown>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-primary-default"
            >
              <BiMenu size={30} />{" "}
            </button>
          </div>

          <FlowbiteNavbar.Collapse>
            {routes.map((route) => (
              <Link key={route.path} to={route.path}>
                <FlowbiteNavbar.Link
                  as="div"
                  active={
                    pathname === route.path ||
                    (pathname === "/" && route.path === "/home")
                  }
                >
                  {route.label}
                </FlowbiteNavbar.Link>
              </Link>
            ))}
          </FlowbiteNavbar.Collapse>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary-default"
          >
            <BiMenu size={30} />{" "}
          </button>

          <FlowbiteNavbar.Collapse>
            <Link to="/login">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/login"}>
                Sign in
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/register">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/register"}>
                Register
              </FlowbiteNavbar.Link>
            </Link>
          </FlowbiteNavbar.Collapse>
        </>
      )}

      <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
    </FlowbiteNavbar>
  );
}
