import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFullback } from "../shared/ErrorBoundaryFullback";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useProtectedRoutes from "../../hooks/useProtectedRoutes";
import MainSpinner from "../shared/MainSpinner";
import useScrollTop from "@/hooks/useScrollTop";
import ScrollTopButton from "../shared/ScrollTopButton";

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

  // Always scroll to top of the page
  // when moving between routes
  useScrollTop();

  if (loading) {
    return <MainSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="sm:min-h-[70vh] container text-center mx-auto px-3 py-5 md:py-10">
        <ErrorBoundary FallbackComponent={ErrorBoundaryFullback}>
          <Suspense fallback={<MainSpinner size={50} className="h-[50vh]" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ScrollTopButton />
      <Footer />
    </>
  );
}
