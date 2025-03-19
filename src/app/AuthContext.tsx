"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { UserData } from "./components/type/user.type";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  dataUser: UserData | null;
  setDataUser: React.Dispatch<React.SetStateAction<UserData |null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);  
  const [dataUser, setDataUser] = useState<UserData | null>(null);
 
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, dataUser ,setDataUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider");
  return context;
}
