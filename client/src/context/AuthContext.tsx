import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Axios from "axios";
import { useAlert } from "./AlertContext";
import { User } from "../interfaces/User";

interface AuthContextType {
  isAuth: boolean;
  setAuth: (auth: boolean) => void;
  isLoading: boolean;
  error: boolean;
  user: User;
  apiUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

  const [isAuth, setAuth] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { showAlert } = useAlert();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth(false);
        setLoading(false);
        return;
      }

      try {
        const response = await Axios.get(`${apiUrl}/users/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(response.data.loggedIn);
        setUser(response.data.user);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          setAuth(false);
          showAlert("Термін сесії скінчився. Будь ласка, залогуйтесь знову", "warning");
        } else {
          setError(true);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, isLoading, error, user, apiUrl }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
