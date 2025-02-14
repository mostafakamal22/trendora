import { useLocalStorage } from "@uidotdev/usehooks";
import { Drawer, Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { BsX } from "react-icons/bs";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import logo from "@/assets/images/logo-1.png";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

// Centralized route configuration
const routes = [
  {
    path: "/",
    label: "Home",
    icon: <HiChartPie className="text-green-600 -mr-1" size={20} />,
  },
  {
    path: "/cart",
    label: "Cart",
    icon: <HiShoppingBag className="text-green-600 -mr-1" size={20} />,
  },
  {
    path: "/wishlist",
    label: "Wishlist",
    icon: <HiClipboard className="text-green-600 -mr-1" size={20} />,
  },
  {
    path: "/products",
    label: "Products",
    icon: <HiCollection className="text-green-600 -mr-1" size={20} />,
  },
  {
    path: "/categories",
    label: "Categories",
    icon: <HiInformationCircle className="text-green-600 -mr-1" size={20} />,
  },
  {
    path: "/brands",
    label: "Brands",
    icon: <HiUsers className="text-green-600 -mr-1" size={20} />,
  },
  {
    path: "/allorders",
    label: "Orders",
    icon: <HiChartPie className="text-green-600 -mr-1" size={20} />,
  },
];

export default function MobileNavigation({ isOpen, setIsOpen }: Props) {
  const [token, setToken] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");
  const [, setUser] = useLocalStorage("user");

  const pathname = useLocation()?.pathname;

  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);

  function handleLogout() {
    setToken(null);
    setUserId(null);
    setUser(null);

    navigate("/login");
  }

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Header
        title="TRENDORA"
        titleIcon={() => (
          <>{<img src={logo} className="h-8 mr-1.5" alt="Logo" />}</>
        )}
        closeIcon={() => <BsX size={30} />}
      />
      <Drawer.Items>
        <Sidebar
          aria-label="Sidebar navigation"
          className="[&>div]:bg-transparent [&>div]:p-0"
        >
          <div className="flex h-full flex-col justify-between py-2">
            {token ? (
              <Sidebar.Items>
                <Sidebar.ItemGroup className="space-y-2">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Sidebar.Item
                        icon={() => route.icon}
                        className={twMerge(
                          "uppercase font-playfair leading-4",
                          pathname === route.path &&
                            "bg-primary-peach text-green-600 font-bold"
                        )}
                        as="span"
                      >
                        {route.label}
                      </Sidebar.Item>
                    </Link>
                  ))}
                </Sidebar.ItemGroup>

                <Sidebar.ItemGroup>
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    <Sidebar.Item
                      icon={() => (
                        <IoLogOut
                          className="text-primary-peach -mr-1"
                          size={20}
                        />
                      )}
                      className="uppercase font-playfair font-bold leading-4 cursor-pointer bg-red-600 text-primary-peach border border-red-600 shadow"
                      as="span"
                    >
                      Logout
                    </Sidebar.Item>
                  </button>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            ) : (
              <Sidebar.Items>
                <Sidebar.ItemGroup className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Sidebar.Item
                      icon={() => (
                        <IoLogIn className="text-green-600 -mr-1" size={20} />
                      )}
                      className={twMerge(
                        "uppercase font-playfair leading-4",
                        pathname === "/login" &&
                          "bg-primary-peach text-green-600 font-bold"
                      )}
                      as="span"
                    >
                      Sign in
                    </Sidebar.Item>
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Sidebar.Item
                      icon={() => (
                        <FaUsers className="text-green-600 -mr-1" size={20} />
                      )}
                      className={twMerge(
                        "uppercase font-playfair leading-4",
                        pathname === "/register" &&
                          "bg-primary-peach text-green-600 font-bold"
                      )}
                      as="span"
                    >
                      Register
                    </Sidebar.Item>
                  </Link>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            )}
          </div>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
}
