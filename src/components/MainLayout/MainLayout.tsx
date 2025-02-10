import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useProtectedRoutes from "../../hooks/useProtectedRoutes";
import useModal from "@/hooks/useModal";
import Modal from "../ui/Modal";

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
