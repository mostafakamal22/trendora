import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import GradientText from "../ui/GradientText";

export default function ProductsHeader() {
  const pathname = useLocation()?.pathname;

  return (
    <header
      className={twMerge(
        pathname !== "/" &&
          pathname !== "/home" &&
          pathname !== "/home/" &&
          "col-span-full max-w-xl mx-auto"
      )}
    >
      <GradientText>
        <h1 className="uppercase">Trendy Looks, Timeless Style.</h1>
      </GradientText>
    </header>
  );
}
