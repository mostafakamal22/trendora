import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ShoppingCart } from "lucide-react";

import logo from "@/assets/images/logo-1.png";

export default function Navbar() {
  const [token, setToken] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");

  const pathname = useLocation()?.pathname;

  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    setUserId(null);
    navigate("/login");
  }

  return (
    <FlowbiteNavbar
      className="border-b-primary-peach"
      border
      theme={{
        link: {
          base: "block py-2 pl-3 pr-4 md:p-0 transition-all duration-200 ease-in-out md:text-base",
          active: {
            on: "bg-primary-default text-white dark:text-white md:bg-transparent md:text-primary-default",
            off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-primary-default md:dark:hover:bg-transparent md:dark:hover:text-white",
          },
        },
      }}
    >
      <Link to="/">
        <FlowbiteNavbar.Brand className="gap-1 select-none">
          <img src={logo} className="h-6 sm:h-9" alt="Logo" />
          <h2 className="uppercase bg-gradient-to-tr from-primary-default to-primary-sunset bg-clip-text text-transparent drop-shadow">
            Trendora
          </h2>
        </FlowbiteNavbar.Brand>
      </Link>

      {token ? (
        <>
          <div className="flex md:order-2 md:items-center">
            <Link
              to="/cart"
              className="mr-5 relative"
              title="Shoping Cart Items"
            >
              <ShoppingCart className="text-gray-400" size={30} />

              <span className="h-5 w-5 flex justify-center items-center absolute bottom-1 md:-bottom-1 md:-right-1 bg-primary-default text-white font-semibold text-xs p-1 rounded-full shadow">
                5
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
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
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
              <FlowbiteNavbar.Link active={pathname === "/"}>
                Home
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/cart" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/cart"}>
                Cart
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/wishlist" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/wishlist"}>
                Wishlist
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/products" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/products"}>
                Products
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/categories" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/categories"}>
                Categories
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/brands" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/brands"}>
                Brands
              </FlowbiteNavbar.Link>
            </Link>
          </FlowbiteNavbar.Collapse>
        </>
      ) : (
        <>
          <FlowbiteNavbar.Toggle />

          <FlowbiteNavbar.Collapse>
            <Link to="/login" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/login"}>
                Login
              </FlowbiteNavbar.Link>
            </Link>

            <Link to="/register" className="hover:text-gray-200">
              <FlowbiteNavbar.Link active={pathname === "/register"}>
                Register
              </FlowbiteNavbar.Link>
            </Link>
          </FlowbiteNavbar.Collapse>
        </>
      )}
    </FlowbiteNavbar>
  );
}
