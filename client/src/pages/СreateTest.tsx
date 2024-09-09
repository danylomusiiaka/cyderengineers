import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { Test } from "../interfaces/Test";

function CreateTest() {
  const navigate = useNavigate();
  const { user, apiUrl } = useAuth();
  const { showAlert } = useAlert();

  const addTest = async (values: Test) => {
    const response = await Axios.post(`${apiUrl}/tests/addtest`, {
      name: values.name,
      option: values.option,
      description: values.description,
      author: user.email,
      picture: values.picture
    });

    if (response.status === 200) {
      navigate("/");
      showAlert(`Ваш тест ${values.name} було створено успішно!`, "success", "filled");
    }
  };

  const initialValues = {
    _id: "",
    name: "",
    option: "",
    description: "",
    author: "",
    picture: ""
  };

  const validation = Yup.object().shape({
    name: Yup.string().required("Поле імені є обов'язковим"),
    option: Yup.string().required("Категорія має бути обрана"),
    description: Yup.string()
      .required("Опис є обов'язковим")
      .max(500, "Опис повинен бути не більше 500 символів"),
  });

  return (
    <div className='auth-section'>
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={addTest}>
        <Form className='formContainer createtest'>
          <h1>Створити новий тест</h1>
          <label>Обкладинка тесту: </label>
          <Field id='inputData' name='picture' />
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
