import React, { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

type User = {
  _id: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        console.log("res user : ", res);

        const userData = await res.json();
        console.log("data user : ", userData);
        setUser(userData);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
