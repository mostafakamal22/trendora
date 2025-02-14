import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function useScrollTop() {
  const pathname = useLocation()?.pathname;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const yOffset = window?.scrollY;

    if (yOffset > 0) {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, searchParams]);

  return null;
}
