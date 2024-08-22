import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth, setisVerified } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password, verificationKey } = location.state || {};

  const handleVerification = async (values) => {
    try {
      const response = await Axios.post("http://localhost:3001/users/verify-email", {
        verificationKey,
        userInputKey: values.verificationKey,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setAuth(true);
      setisVerified(true);
      navigate("/");
    } catch (error) {
      setErrorMessage("Верифікація не відбулась. Перевірте правильність ключа і спробуйте ще раз.");
    }
  };

  const validationSchema = Yup.object().shape({
    verificationKey: Yup.string()
      .length(6, "Код верифікації повинен містити рівно 6 символів")
      .required("Поле ключа є обов'язковим"),
  });

  return (
    <div className='auth-section'>
      <Formik
        initialValues={{ verificationKey: "" }}
        validationSchema={validationSchema}
        onSubmit={handleVerification}
      >
        <Form className='formContainer'>
          <h1>Введіть верифікаційний код</h1>

          <Field id='inputData' name='verificationKey' type='text' />
          <ErrorMessage name='verificationKey' component='span' />
          <button type='submit'>Верифікувати пошту</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Alert severity='info' sx={{ padding: "10px 20px", marginTop: "20px" }}>
            Підтверження надіслано на пошту {email}
          </Alert>
        </Form>
      </Formik>
    </div>
  );
}
