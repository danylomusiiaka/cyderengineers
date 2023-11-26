import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function SignUpPage() {
    const navigate = useNavigate()

    const addUser = async (values) => {
        const response = await Axios.post('http://localhost:3001/adduser', {
            email: values.email,
            password: values.password,
        });
        if (response.status === 200) {
            navigate("/main", { state: { email: values.email } })
        }
    };

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validation = Yup.object().shape({
        email: Yup.string().required("Поле пошти є обов'язковим"),
        password: Yup.string().required("Поле паролю є обов'язковим"),
        confirmPassword: Yup.string()
            .required("Поле підтверження паролю є обов'язковим")
            .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати'),
    });

    return (
        <div className='auth-section'>
            <Formik initialValues={initialValues} validationSchema={validation} onSubmit={addUser}>
                <Form className='formContainer'>
                    <h1>Реєстрація</h1>
                    <label>Пошта: </label>
                    <Field id="inputData" name="email" />
                    <ErrorMessage name='email' component='span' />
                    <label>Пароль: </label>
                    <Field id="inputData" name="password" type="password" />
                    <ErrorMessage name='password' component='span' />
                    <label>Підтверження паролю: </label>
                    <Field id="inputData" name="confirmPassword" type="password" />
                    <ErrorMessage name='confirmPassword' component='span' />
                    <button type="submit">Зареєструватись</button>
                    <p>Вже маєте обліковий запис? <Link className='link' to="/login">Увійдіть</Link></p>
                </Form>
            </Formik>
        </div>
    );
}

export default SignUpPage;
