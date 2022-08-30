import * as yup from 'yup'
import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'
import { useFormik } from 'formik'
import style from '../../styles/auth/Forms.module.scss'
import { UserRoles } from '../../types/user/userRoles.enum'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useMutation, useQuery } from '@apollo/client'
import { setToken } from '../../utilities/tokens-service'
import { checkAuth } from '../../utilities/auth/checkAuth'
import RoleButton from '../../components/auth/RoleButton'
import AuthBackground from '../../components/auth/AuthBackground'
import { SIGN_UP } from '../../graphql/mutations.js/auth.mutations'
import { GET_ALL_STYLES } from '../../graphql/queries/style-queries'
import MusicStyleCard from '../../components/music/MusicStyleCard'


const SignUpPage = () => {
    const { data: styles } = useQuery(GET_ALL_STYLES)
    const [stylesIds, setStylesIds] = useState<number[]>([])

    const formik = useFormik({
        initialValues: { email: '', password: '', role: '' },
        onSubmit: values => { singUp() },
        validationSchema: yup.object({
            email: yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: yup.string()
                .min(6, 'Must be at least 6 characters')
                .max(16, 'Must be 16 characters or less')
                .required('Password is required'),
            role: yup.mixed()
                .oneOf(Object.values(UserRoles))
                .required('Role is required')
        })
    })

    const [singUp, { loading, error }] = useMutation(SIGN_UP, {
        variables: {
            createUserInput: {
                email: formik.values.email,
                password: formik.values.password,
                role: formik.values.role,
                stylesIds
            }
        },
        onCompleted: (data) => {
            setToken(data.signup.access_token)
            checkAuth()
            Router.push('/profile')
        }
    })

    const chooseStyle = (styleId: number, add: boolean) => {
        if (add && stylesIds?.length < 5) {
            setStylesIds(prev => [...prev, styleId])
        } else if (!add) {
            setStylesIds(prev => prev.filter(el => el !== styleId))
        }
    }

    return (
        <AuthBackground>
            <form onSubmit={formik.handleSubmit}>
                <div className={cn(style.form, style.signUp)}>
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
                        onBlur={formik.handleBlur}
                    />
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
                        onBlur={formik.handleBlur}
                    />
                    <div className={style.error}>
                        {(formik.errors.role && formik.touched.role)
                            && formik.errors.role}
                    </div>
                    <div className={style.chooseRole}>
                        <div className={style.chooseRoleTitle}>Who are you?</div>
                        <div className={style.chooseRoleBtns}>
                            <RoleButton
                                value={UserRoles.LISTENER}
                                id='role'
                                selectedRole={formik.values.role}
                                onClick={formik.handleChange} />
                            <RoleButton
                                id='role'
                                value={UserRoles.MUSICIAN}
                                selectedRole={formik.values.role}
                                onClick={formik.handleChange} />
                        </div>
                    </div>
                    {formik.values.role == UserRoles.MUSICIAN &&
                        <div className={style.chooseStyle}>
                            <div className={style.stylesTitle}>
                                ... and your musical styles {stylesIds.length}/5
                            </div>
                            <div className={style.styles}>
                                {styles?.styles.map(item =>
                                    <MusicStyleCard
                                        chooseStyle={chooseStyle}
                                        name={item.name}
                                        id={item.id}
                                        key={item.id}
                                        limit={stylesIds.length < 5}
                                        auth={true}
                                    />)}
                            </div>
                        </div>}
                    <Button type='submit' text='Sign up' disabled={loading} />
                    <div className={style.error}>{error && "Error"}</div>
                    <div className={style.message}> Already have an account?
                        <Link href='/auth/signin'><a>Sign in!</a></Link>
                    </div>
                </div>
            </form>
        </AuthBackground>
    )
}

export default SignUpPage