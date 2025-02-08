import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Navbar() {
  const [token, setToken] = useLocalStorage("token");

  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);

    navigate("/login");
  }

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Trendora
        </Link>

        <div className="flex space-x-6">
          {token ? (
            <>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
              <Link to="/cart" className="hover:text-gray-200">
                Cart
              </Link>
              <Link to="/wishlist" className="hover:text-gray-200">
                Wishlist
              </Link>
              <Link to="/products" className="hover:text-gray-200">
                Products
              </Link>
              <Link to="/categories" className="hover:text-gray-200">
                Categories
              </Link>
              <Link to="/brands" className="hover:text-gray-200">
                Brands
              </Link>

              <Link to="/profile" className="hover:text-gray-200">
                Profile
              </Link>
              <button className="hover:text-gray-200" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
