import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/client'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import style from '../../styles/auth/Forms.module.scss'
import { setToken } from '../../utilities/tokens-service'
import { checkAuth } from '../../utilities/auth/checkAuth'
import AuthBackground from '../../components/auth/AuthBackground'
import { SIGN_IN } from '../../graphql/mutations.js/auth.mutations'


const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [singIn, { loading }] = useMutation(SIGN_IN, {
        variables: { signInInput: { email, password } },
        onCompleted: (data) => {
            setToken(data.signin.access_token);
            checkAuth();
            Router.push('/profile')
        },
        onError: (error) => console.log(error)
    })

    return (
        <AuthBackground>
            <div className={cn(style.form, style.signIn)}>
                <Input placeholder='Enter email...'
                    type='email'
                    width='medium'
                    onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Enter password...'
                    type='password'
                    width='medium'
                    onChange={(e) => setPassword(e.target.value)} />
                <Button text='Sign in' onClick={singIn} disabled={loading} />
                <div className={style.message}>Don't have an account?
                    <Link href="/auth/signup"><a>Sign up!</a></Link>
                </div>
            </div>
        </AuthBackground>
    )
}

export default SignInPage