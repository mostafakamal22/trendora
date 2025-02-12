import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollTop() {
  const pathname = useLocation()?.pathname;

  useEffect(() => {
    const yOffset = window?.scrollY;

    if (yOffset > 0) {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
}
