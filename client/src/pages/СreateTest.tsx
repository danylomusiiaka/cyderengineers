import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { Test } from "../interfaces/Test";
import { useState } from "react";

function CreateTest() {
  const navigate = useNavigate();
  const { user, apiUrl } = useAuth();
  const { showAlert } = useAlert();
  const [next, setNext] = useState(false);

  const addTest = async (values: Test) => {
    const response = await Axios.post(`${apiUrl}/tests/addtest`, {
      name: values.name,
      category: values.category,
      description: values.description,
      author: user.email,
      picture: values.picture,
      questions: values.questions,
    });

    if (response.status === 200) {
      navigate("/");
      showAlert(`Ваш тест ${values.name} було створено успішно!`, "success", "filled");
    }
  };

  const initialValues = {
    _id: "",
    name: "",
    category: "",
    description: "",
    author: "",
    picture: "",
    questions: [{ name: "", options: [] }],
  };

  const validation = Yup.object().shape({
    name: Yup.string().required("Поле імені є обов'язковим"),
    category: Yup.string().required("Категорія має бути обрана"),
    description: Yup.string()
      .required("Опис є обов'язковим")
      .max(500, "Опис повинен бути не більше 500 символів"),
    questions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Назва питання є обов'язковою"),
        options: Yup.array().of(Yup.string().required("Назва варіанту є обов'язковою")),
      })
    ),
  });

  return (
    <div className='test-section'>
      <Formik initialValues={initialValues} validationSchema={validation} onSubmit={addTest}>
        {({ values, setFieldValue, errors }) => (
          <Form className='formContainer createtest'>
            <h1>Створити новий тест</h1>
            {!next ? (
              <>
                <label>Обкладинка тесту: </label>
                <Field id='inputData' name='picture' />
                <label>Ім'я: </label>
                <Field id='inputData' name='name' />
                <ErrorMessage name='name' component='span' />
                <label>Категорія: </label>
                <Field id='inputData' name='category' as='select'>
                  <option value='' label='Оберіть категорію' />
                  <option value='Культура'>Культура</option>
                  <option value='Мова'>Мова</option>
                  <option value='Історія'>Історія</option>
                </Field>
                <ErrorMessage name='category' component='span' />
                <label>Опис: </label>
                <Field
                  as='textarea'
                  id='inputData'
                  name='description'
                  style={{ height: "150px" }}
                />
                <ErrorMessage name='description' component='span' />

                <button
                  type='button'
                  onClick={() => setNext(true)}
                  disabled={!(values.name && values.category && values.description)}
                  className={
                    values.name && values.category && values.description
                      ? "btn-active"
                      : "btn-disabled"
                  }
                >
                  Далі
                </button>
              </>
            ) : (
              <>
                <FieldArray name='questions'>
                  {({ push, remove }) => (
                    <>
                      {values.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className='questions'>
                          <h5>Питання {questionIndex + 1}</h5>
                          <label>Назва: </label>
                          <Field id='inputData' name={`questions.${questionIndex}.name`} />
                          <ErrorMessage name={`questions.${questionIndex}.name`} component='span' />
                          <label>Оберіть кількість варіантів</label>
                          <Field
                            id='inputData'
                            name={`questions.${questionIndex}.options.length`}
                            as='select'
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                              const newLength = parseInt(e.target.value, 10);
                              setFieldValue(
                                `questions.${questionIndex}.options`,
                                Array(newLength).fill("")
                              );
                            }}
                          >
                            <option value='' label='' />
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                          </Field>

                          <FieldArray name={`questions.${questionIndex}.options`}>
                            {({ push, remove }) => (
                              <>
                                {question.options.map((option, optionIndex) => (
                                  <>
                                    <div key={optionIndex} className='options'>
                                      <label>Варіант {optionIndex + 1}: </label>
                                      <Field
                                        id='inputData'
                                        name={`questions.${questionIndex}.options.${optionIndex}`}
                                      />

                                      {optionIndex === 0 && <> - правильна відповідь</>}
                                    </div>
                                    <ErrorMessage
                                      name={`questions.${questionIndex}.options.${optionIndex}`}
                                      component='span'
                                    />
                                  </>
                                ))}
                              </>
                            )}
                          </FieldArray>

                          <div className='controls'>
                            <button
                              type='button'
                              onClick={() =>
                                values.questions.length > 1
                                  ? remove(questionIndex)
                                  : showAlert("Мінімальна кількість питань повинна бути 1", "error")
                              }
                            >
                              <img src='bin.png' alt='' />
                            </button>
                            <button
                              type='button'
                              onClick={() =>
                                values.questions.length < 5
                                  ? push({ name: "", correct_answer: 0, options: [] })
                                  : showAlert(
                                      "Максимальна кількість питань повинна бути 5",
                                      "error"
                                    )
                              }
                            >
                              <img src='add.png' alt='' />
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>

                <button type='button' onClick={() => setNext(false)}>
                  Назад
                </button>
                <button
                  type='submit'
                  className={
                    values.questions.every((question) => question.name) &&
                    values.questions.every((question) => question.options.length !== 0) &&
                    values.questions.every((question) =>
                      question.options.every((option) => option !== "")
                    )
                      ? "btn-active"
                      : "btn-disabled"
                  }
                >
                  Зберегти
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTest;
