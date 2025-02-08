import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useProtectedRoutes() {
  const [token] = useLocalStorage("token");

  console.log("Stored Token:", token);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const publicRoutes = useMemo(
    () => ["/login", "/login/", "/register", "/register/"],
    []
  );

  useEffect(() => {
    const isPathnamePublic = publicRoutes.includes(pathname);

    console.log(
      "Is Public Route:",
      isPathnamePublic,
      "Current Path:",
      pathname
    );

    if (token && isPathnamePublic) {
      navigate("/", { replace: true });
    }

    if (!token && !isPathnamePublic) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate, pathname, publicRoutes]);

  return null;
}
