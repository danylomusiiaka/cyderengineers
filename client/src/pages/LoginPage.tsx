import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginInfo {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { setAuth, apiUrl } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async (values: LoginInfo) => {
    try {
      const response = await Axios.post(`${apiUrl}/users/login`, {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        navigate("/");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Неправильна пошта або пароль.");
      }
    }
  };

  const validation = Yup.object().shape({
    email: Yup.string().required("Поле пошти є обов'язковим"),
    password: Yup.string().required("Поле паролю є обов'язковим"),
  });

  return (
    <div className='auth-section'>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validation}
        onSubmit={loginUser}
      >
        <Form className='formContainer'>
          <h1>Логін</h1>
          <label>Пошта: </label>
          <Field id='inputData' name='email' type='email' />
          <ErrorMessage name='email' component='span' />
          <label>Пароль: </label>
          <Field id='inputData' name='password' type='password' />
          <ErrorMessage name='password' component='span' />
          <button type='submit'>Увійти</button>
          <p>
            Не маєте облікового запису?{" "}
            <Link className='link' to='/sign-up'>
              Зареєструйтесь
            </Link>
          </p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Form>
      </Formik>
    </div>
  );
}

export default LoginPage;
