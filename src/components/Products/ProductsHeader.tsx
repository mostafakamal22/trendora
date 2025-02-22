import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import GradientText from "../ui/GradientText";

export default function ProductsHeader() {
  const pathname = useLocation()?.pathname;

  return (
    <header
      className={twMerge(
        pathname !== "/" &&
          !pathname?.startsWith("/home") &&
          !pathname?.startsWith("/productDetails") &&
          "col-span-full max-w-xl mx-auto"
      )}
    >
      {pathname?.startsWith("/productDetails") ? (
        <GradientText>
          <h2 className="uppercase">Inspired by Your Style</h2>
        </GradientText>
      ) : (
        <GradientText>
          <h1 className="uppercase">Trendy Looks, Timeless Style.</h1>
        </GradientText>
      )}
    </header>
  );
}
