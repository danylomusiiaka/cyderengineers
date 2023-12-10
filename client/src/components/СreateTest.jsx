import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';

function CreateTest() {
    const navigate = useNavigate();
    const addTest = async (values) => {
        const response = await Axios.post('http://localhost:3001/addtest', {
            name: values.name,
            option: values.option,
            description: values.description,
        });

        if (response.status === 200) {
            navigate("/");
        }
    };

    const initialValues = {
        name: '',
        option: '',
        description: '',
    };

    const validation = Yup.object().shape({
        name: Yup.string().required("Поле імені є обов'язковим"),
        option: Yup.string().required("Категорія має бути обрана"),
    });

    return (
        <div className='auth-section'>
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={addTest}>
                <Form className='formContainer'>
                    <h1>Створити новий тест</h1>
                    <label>Ім'я: </label>
                    <Field id="inputData" name="name" />
                    <ErrorMessage name='name' component='span' />
                    <label>Категорія: </label>
                    <Field id="inputData" name="option" as="select">
                        <option value="" label="Оберіть категорію" />
                        <option value="Культура">Культура</option>
                        <option value="Мова">Мова</option>
                        <option value="Історія">Історія</option>
                    </Field>
                    <ErrorMessage name='option' component='span' />
                    <label>Опис: </label>
                    <Field as="textarea" id="inputData" name="description" />
                    <button type="submit">Створити</button>
                </Form>
            </Formik>
        </div>

    );
}

export default CreateTest;
