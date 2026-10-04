"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { DEMO_USERS } from "@/lib/constants";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for logged in user on mount
    const storedUserId = localStorage.getItem("jk_auth_user");
    if (storedUserId) {
      const demoUser = DEMO_USERS.find(u => u.userId === storedUserId);
      if (demoUser) {
        // Construct full user object for demo purposes
        setUser({
          id: demoUser.userId,
          name: demoUser.name,
          email: demoUser.email,
          phone: "9876543210", // Dummy
          role: demoUser.role,
          isActive: true,
          joinDate: "2020-01-01"
        });
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userId: string) => {
    const demoUser = DEMO_USERS.find(u => u.userId === userId);
    if (demoUser) {
      setUser({
        id: demoUser.userId,
        name: demoUser.name,
        email: demoUser.email,
        phone: "9876543210",
        role: demoUser.role,
        isActive: true,
        joinDate: "2020-01-01"
      });
      localStorage.setItem("jk_auth_user", userId);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jk_auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
