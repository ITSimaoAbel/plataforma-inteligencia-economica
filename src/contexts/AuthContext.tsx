import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  province?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (data: Omit<User, "id"> & { password: string }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: (User & { password: string })[] = [
  { id: "1", name: "Demo User", email: "demo@empresa.co.mz", password: "senha123", company: "Empresa Demo Lda", phone: "+258 84 123 4567", province: "Maputo Cidade" },
  { id: "2", name: "Admin", email: "admin@ie.co.mz", password: "admin123", company: "IE Moçambique", isAdmin: true },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string) => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((data: Omit<User, "id"> & { password: string }) => {
    const { password: _, ...userData } = data;
    const newUser = { ...userData, id: crypto.randomUUID() };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
