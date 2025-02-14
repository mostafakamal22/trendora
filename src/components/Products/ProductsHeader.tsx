import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function ProductsHeader() {
  const pathname = useLocation()?.pathname;

  return (
    <header
      className={twMerge(pathname !== "/" && "col-span-full max-w-xl mx-auto")}
    >
      <h1>Trendy Looks, Timeless Style.</h1>
    </header>
  );
}
