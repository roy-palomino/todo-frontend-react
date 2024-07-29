import { FC, useEffect } from "react";

import { useLocation } from "wouter";
import { logout } from "../services/auth.service.ts";

const Logout: FC = () => {
  const [_, navigate] = useLocation();

  async function clearTokens() {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.clear();
      navigate("/login", {
        replace: true,
      });
    }
  }

  useEffect(() => {
    clearTokens();
  }, []);

  return <div></div>;
};

export default Logout;
