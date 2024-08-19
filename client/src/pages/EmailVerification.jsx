import Axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmailVerification() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { setAuth, setisVerified } = useAuth();

  useEffect(() => {
    const fetchResult = async () => {
        try {
        await Axios.get(`http://localhost:3001/users/verify-email?token=${token}`);
          setTimeout(() => {
              setAuth(true);
              setisVerified(true);
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    if (token) {
      fetchResult();
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  return <div>Пошта успішно верифікована! Перенаправляємо на головну сторінку...</div>;
}
