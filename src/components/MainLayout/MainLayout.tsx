import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useProtectedRoutes from "../../hooks/useProtectedRoutes";

export default function MainLayout() {
  const { loading, token, publicRoutes } = useProtectedRoutes();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (token && isPublicRoute) {
      navigate("/", { replace: true });
    } else if (!token && !isPublicRoute) {
      navigate("/login", { replace: true });
    }
  }, [token, pathname, navigate, publicRoutes, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container text-center mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
