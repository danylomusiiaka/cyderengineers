import { Formik, Form, Field, ErrorMessage } from 'formik';
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
        <div className='create-post'>
            <Formik initialValues={initialValues} validationSchema={validation}>
                <Form className='formContainer'>
                    <label>Ім'я користувача: </label>
                    <Field id="inputData" name="username" />
                    <ErrorMessage name='username' component='span' />
                    <label>Пароль: </label>
                    <Field id="inputData" name="password" />
                    <ErrorMessage name='password' component='span' />
                    <button type='submit'>Увійти</button>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage
