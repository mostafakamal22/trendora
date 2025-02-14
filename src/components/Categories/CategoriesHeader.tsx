import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function CategoriesHeader() {
  const pathname = useLocation()?.pathname;

  return (
    <header
      className={twMerge(pathname !== "/" && "col-span-full max-w-xl mx-auto")}
    >
      <h1>Trendy Picks, Crafted for You.</h1>
    </header>
  );
}
