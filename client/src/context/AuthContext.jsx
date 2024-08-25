import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useAlert } from "./AlertContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { showAlert } = useAlert();

  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth(false);
        setLoading(false);
        return;
      }

      try {
        const response = await Axios.get("http://localhost:3001/users/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(response.data.loggedIn);
        setUser(response.data.user);
      } catch (error) {
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
    <AuthContext.Provider value={{ isAuth, setAuth, isLoading, error, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
