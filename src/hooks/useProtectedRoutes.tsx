import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { VerfiyToken } from "../types";
import fetchData from "../utils/fetchData";

export default function useProtectedRoutes() {
  const [token, setToken] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");
  const [loading, setLoading] = useState(true);

  const publicRoutes = useMemo(
    () => ["/login", "/register", "/login/", "/register/"],
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

        console.log("Verify Response", res);
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
