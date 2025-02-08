import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import useProtectedRoutes from "../../hooks/useProtectedRoutes";

export default function MainLayout() {
  useProtectedRoutes();

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
