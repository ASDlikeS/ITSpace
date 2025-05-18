import { createContext, useEffect, useState, type ReactNode } from "react";
import type { IAuthContext, UserData } from "../types/TAuth";
import axios from "../api/axios";

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<UserData | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setIsAuth(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = (token: string, userData: UserData) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
