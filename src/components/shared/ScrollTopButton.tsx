import { useWindowScroll } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { twMerge } from "tailwind-merge";

export default function ScrollTopButton() {
  const [isHidden, setIsHidden] = useState(true);

  const [{ y }, scrollTo] = useWindowScroll();

  useEffect(() => {
    if (!y) return;

    if (y >= 0.2 * window.innerHeight && isHidden) {
      return setIsHidden(false);
    }

    if (y < 0.2 * window.innerHeight && !isHidden) {
      return setIsHidden(true);
    }
  }, [y, isHidden]);

  return (
    <button
      className={twMerge(
        "fixed bottom-2 sm:bottom-4 right-3 sm:right-4 z-30 flex justify-center items-center bg-green-600 text-primary-peach p-1 rounded-full shadow-lg animate-bounce transition-all duration-300",
        isHidden && "invisible"
      )}
      onClick={() =>
        scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      title="Scroll to top"
    >
      <IoMdArrowDropup size={28} />
    </button>
  );
}
