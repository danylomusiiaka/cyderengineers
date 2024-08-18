import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

function CreateTest() {
  const navigate = useNavigate();
  const { email } = useAuth();
  const { showAlert } = useAlert(); 

  const addTest = async (values) => {
    const response = await Axios.post("http://localhost:3001/tests/addtest", {
      name: values.name,
      option: values.option,
      description: values.description,
      author: email,
    });

    if (response.status === 200) {
      navigate("/");
      showAlert(`Ваш тест ${values.name} було створено успішно!`, "success", 'filled');
    }
  };

  const initialValues = {
    name: "",
    option: "",
    description: "",
  };

  const validation = Yup.object().shape({
    name: Yup.string().required("Поле імені є обов'язковим"),
    option: Yup.string().required("Категорія має бути обрана"),
    description: Yup.string()
      .required("Опис є обов'язковим")
      .max(100, "Опис повинен бути не більше 100 символів"),
  });

  return (
    <div className='auth-section'>
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={addTest}>
        <Form className='formContainer createtest'>
          <h1>Створити новий тест</h1>
          <label>Ім'я: </label>
          <Field id='inputData' name='name' />
          <ErrorMessage name='name' component='span' />
          <label>Категорія: </label>
          <Field id='inputData' name='option' as='select'>
            <option value='' label='Оберіть категорію' />
            <option value='Культура'>Культура</option>
            <option value='Мова'>Мова</option>
            <option value='Історія'>Історія</option>
          </Field>
          <ErrorMessage name='option' component='span' />
          <label>Опис: </label>
          <Field as='textarea' id='inputData' name='description' style={{ height: "150px" }} />
          <ErrorMessage name='description' component='span' />
          <button type='submit'>Створити</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateTest;
