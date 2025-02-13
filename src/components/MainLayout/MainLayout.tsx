import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFullback } from "../shared/ErrorBoundaryFullback";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useProtectedRoutes from "../../hooks/useProtectedRoutes";
import useModal from "@/hooks/useModal";
import Modal from "../ui/Modal";
import MainSpinner from "../shared/MainSpinner";
import useScrollTop from "@/hooks/useScrollTop";

export default function MainLayout() {
  const { isOpen, children, closeModal, title, desc } = useModal();

  const onChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

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
      <main className="min-h-screen container text-center mx-auto px-3 py-5 md:py-10">
        <ErrorBoundary FallbackComponent={ErrorBoundaryFullback}>
          <Suspense fallback={<MainSpinner size={50} className="h-[50vh]" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Modal
        isOpen={isOpen}
        onChange={onChange}
        title={title}
        description={desc}
      >
        {children}
      </Modal>
      <Footer />
    </>
  );
}
