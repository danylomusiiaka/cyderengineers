import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/users/status").then((response) => {
      setAuth(response.data.loggedIn);
      setLoading(false);
    });
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, isLoading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
