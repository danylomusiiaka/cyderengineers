import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

function LoginPage() {
    const initialValues = {
        username: "",
        password: "",
    }

    const validation = Yup.object().shape({
        username: Yup.string().required("Поле імені є обов'язковим"),
        password: Yup.string().required("Поле паролю є обов'язковим"),
    })

    return (
        <div className='auth-section'>
            <Formik initialValues={initialValues} validationSchema={validation}>
                <Form className='formContainer'>
                    <h1>Логін</h1>
                    <label>Ім'я користувача: </label>
                    <Field id="inputData" name="username" />
                    <ErrorMessage name='username' component='span' />
                    <label>Пароль: </label>
                    <Field id="inputData" name="password" />
                    <ErrorMessage name='password' component='span' />
                    <button type='submit'>Увійти</button>
                    <p>Не маєте облікового запису? <Link className='link' to="/sign-up">Зареєструйтесь</Link></p>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage
