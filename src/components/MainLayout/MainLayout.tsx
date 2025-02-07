import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
