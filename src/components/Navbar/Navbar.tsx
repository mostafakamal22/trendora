import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { Cart, LoginResponse } from "@/types";
import { BsCart } from "react-icons/bs";
import fetchData from "@/utils/fetchData";

import logo from "@/assets/images/logo-1.png";

export default function Navbar() {
  const [token, setToken] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");
  const [user, setUser] = useLocalStorage<LoginResponse["user"] | null>("user");

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

    navigate("/login");
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
          base: "block py-2 pl-3 pr-4 lg:p-0 transition-all duration-200 ease-in-out lg:text-base font-playfair font-semibold",
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
          <div className="flex lg:order-2 lg:items-center">
            <Link
              to="/cart"
              className="mr-5 relative"
              title="Shoping Cart Items"
            >
              <BsCart className="text-gray-400" size={30} />

              <span className="h-5 w-5 flex justify-center items-center absolute bottom-1 lg:-bottom-1 lg:-right-1 bg-primary-default text-white font-semibold text-xs p-1 rounded-full shadow">
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
            >
              <Dropdown.Header>
                <span className="block text-sm truncate">
                  {user?.name || "N/A"}
                </span>
                <span className="max-w-[200px] block truncate text-sm font-medium">
                  {user?.email || "N/A"}
                </span>
              </Dropdown.Header>

              <Dropdown.Item>Settings</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item className="text-red-500" onClick={handleLogout}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <FlowbiteNavbar.Toggle className="ml-2" />
          </div>

          <FlowbiteNavbar.Collapse>
            <Link to="/" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/"}>
                Home
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/cart" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/cart"}>
                Cart
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/wishlist" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/wishlist"}>
                Wishlist
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/products" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/products"}>
                Products
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/categories" className="hover:text-gray-200">
              <FlowbiteNavbar.Link
                as={"div"}
                active={pathname === "/categories"}
              >
                Categories
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/brands" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/brands"}>
                Brands
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/allorders" className="hover:text-gray-200">
              <FlowbiteNavbar.Link
                as={"div"}
                active={pathname === "/allorders"}
              >
                Orders
              </FlowbiteNavbar.Link>
            </Link>
          </FlowbiteNavbar.Collapse>
        </>
      ) : (
        <>
          <FlowbiteNavbar.Toggle />

          <FlowbiteNavbar.Collapse>
            <Link to="/login" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/login"}>
                Login
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/register" className="hover:text-gray-200">
              <FlowbiteNavbar.Link as={"div"} active={pathname === "/register"}>
                Register
              </FlowbiteNavbar.Link>
            </Link>
          </FlowbiteNavbar.Collapse>
        </>
      )}
    </FlowbiteNavbar>
  );
}
