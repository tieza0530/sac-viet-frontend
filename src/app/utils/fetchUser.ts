"use client";
import { useAuth } from "@/app/AuthContext";
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_LOCAL } from "../helper/constant";
import { getNewAccessToken } from "./getNewAccessToken";
import { UserData } from "../components/type/user.type";

export const FetchUser = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);

  const updateAccessToken = async () => {
    const newToken = await getNewAccessToken();
    if (newToken) {
      setAccessToken(newToken.data.accessToken);
      setTimeout(updateAccessToken, 14 * 60 * 1000);
    }
    if (
      newToken?.status === 401 ||
      newToken?.status === 403 ||
      newToken?.status === 500
    ) {
      localStorage.removeItem("account");
      localStorage.removeItem("email");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (accessToken === null) {
            updateAccessToken();
        }
        if (accessToken) {
          const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/user`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
          });

          if (!res.ok) throw new Error("Unauthorized");
          const data = await res.json();
          return setUser(data);
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    getUser();
  }, [accessToken]);
  return user;
};
