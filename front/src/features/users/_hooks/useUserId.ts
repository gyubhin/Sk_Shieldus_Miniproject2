import { useAccessTokenStore } from "@/features/auth";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type JwtPayload = {
  sub?: string;
  userId?: number;
  exp?: number;
  iat?: number;
};

/**
 *@description jwt에서 user id 조회
 */
export function useUserId() {
  const { accessToken } = useAccessTokenStore();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUserId(null);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      const tmp = Number(decoded.sub);
      setUserId(decoded.sub ? tmp : null);
    } catch (e) {
      console.error("❌ Invalid JWT token:", e);
      setUserId(null);
    }
  }, [accessToken]);

  return userId;
}
