import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isVerified, setisVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await Axios.get("http://localhost:3001/users/status", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAuth(response.data.loggedIn);
          setEmail(response.data.email);
          setisVerified(response.data.isVerified);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      } else {
        setAuth(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuth, setAuth, isLoading, email, error, isVerified, setisVerified }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
