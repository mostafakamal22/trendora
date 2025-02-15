import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { VerfiyToken } from "../types";
import fetchData from "../utils/fetchData";

export default function useProtectedRoutes() {
  const [token, setToken] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");
  const [loading, setLoading] = useState(true);

  const publicRoutes = useMemo(
    () => [
      "/",
      "/login",
      "/register",
      "/login/",
      "/register/",
      "/reset-password",
      "/reset-password/",
      "/forgot-password",
      "/forgot-password/",
    ],
    []
  );

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetchData<VerfiyToken>({
          url: "/auth/verifyToken",
          token: token as string,
        });

        setUserId(res?.decoded?.id);
      } catch (error) {
        console.error("Token verification failed:", error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, setToken, setUserId]);

  return { loading, token, publicRoutes };
}
