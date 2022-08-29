import * as yup from 'yup'
import cn from 'classnames'
import Link from 'next/link'
import Router from 'next/router'
import { useMutation } from '@apollo/client'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import style from '../../styles/auth/Forms.module.scss'
import { setToken } from '../../utilities/tokens-service'
import { checkAuth } from '../../utilities/auth/checkAuth'
import AuthBackground from '../../components/auth/AuthBackground'
import { SIGN_IN } from '../../graphql/mutations.js/auth.mutations'
import { useFormik } from 'formik'


const SignInPage = () => {
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: values => { singIn() },
        validationSchema: yup.object({
            email: yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: yup.string()
                .required('Password is required')
        })
    })

    const [singIn, { loading, error }] = useMutation(SIGN_IN, {
        variables: {
            signInInput: {
                email: formik.values.email,
                password: formik.values.password
            }
        },
        onCompleted: (data) => {
            setToken(data.signin.access_token);
            checkAuth();
            Router.push('/profile')
        }
    })

    return (
        <AuthBackground>
            <form onSubmit={formik.handleSubmit}>
                <div className={cn(style.form, style.signIn)}>
                    <div className={style.error}>
                        {(formik.errors.email && formik.touched.email)
                            && formik.errors.email}
                    </div>
                    <Input
                        id='email'
                        value={formik.values.email}
                        placeholder='Enter email...'
                        type='email'
                        width='medium'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <div className={style.error}>
                        {(formik.errors.password && formik.touched.password)
                            && formik.errors.password}
                    </div>
                    <Input
                        id='password'
                        value={formik.values.password}
                        placeholder='Enter password...'
                        type='password'
                        width='medium'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    <Button
                        type='submit'
                        text='Sign in'
                        disabled={loading} />
                    <div className={style.error}>{error && "Error"}</div>
                    <div className={style.message}>Don't have an account?
                        <Link href="/auth/signup"><a>Sign up!</a></Link>
                    </div>
                </div>
            </form>
        </AuthBackground>
    )
}

export default SignInPage