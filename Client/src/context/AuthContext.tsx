import { createContext, useContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: "customer" | "owner" | "admin";
  exp: number;
  iat: number;
}

interface AuthContextType {
  token: string | null;
  role: "customer" | "owner" | "admin" | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const stored = localStorage.getItem("token");

  const [token, setToken] = useState<string | null>(stored);
  const [role, setRole] = useState<"customer" | "owner" | "admin" | null>(null);

  // decode safely on init if stored token is valid
  if (stored && stored.split(".").length === 3) {
    try {
      const decoded = jwtDecode<JwtPayload>(stored);
      setRole(decoded.role);
    } catch {
      setRole(null);
    }
  }

  const login = (jwtToken: string) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);

    // safe decode
    if (jwtToken.split(".").length === 3) {
      try {
        const decoded = jwtDecode<JwtPayload>(jwtToken);
        setRole(decoded.role);
      } catch {
        setRole(null);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};