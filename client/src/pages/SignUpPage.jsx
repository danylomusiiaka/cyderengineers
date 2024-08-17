import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignUpPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultEmail = queryParams.get("email") || "";

  const addUser = async (values) => {
    try {
      const response = await Axios.post("http://localhost:3001/users/adduser", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Ця пошта вже зареєстрована. Спробуйте іншу");
      }
    }
  };

  const initialValues = {
    email: defaultEmail,
    password: "",
    confirmPassword: "",
  };

  const validation = Yup.object().shape({
    email: Yup.string().required("Поле пошти є обов'язковим"),
    password: Yup.string().required("Поле паролю є обов'язковим"),
    confirmPassword: Yup.string()
      .required("Поле підтверження паролю є обов'язковим")
      .oneOf([Yup.ref("password"), null], "Паролі повинні співпадати"),
  });

  return (
    <div className='auth-section'>
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={addUser}>
        <Form className='formContainer'>
          <h1>Реєстрація</h1>
          <label>Пошта: </label>
          <Field id='inputData' name='email' />
          <ErrorMessage name='email' component='span' />
          <label>Пароль: </label>
          <Field id='inputData' name='password' type='password' />
          <ErrorMessage name='password' component='span' />
          <label>Підтверження паролю: </label>
          <Field id='inputData' name='confirmPassword' type='password' />
          <ErrorMessage name='confirmPassword' component='span' />
          <button type='submit'>Зареєструватись</button>
          <p>
            Вже маєте обліковий запис?{" "}
            <Link className='link' to='/login'>
              Увійдіть
            </Link>
          </p>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpPage;
