import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await Axios.get("http://localhost:3001/users/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(response.data.loggedIn);
        setEmail(response.data.user.email);
      } else {
        setAuth(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, isLoading, email }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
