import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'
import cn from 'classnames'
import style from '../../styles/auth/Forms.module.scss'
import { UserRoles } from '../../types/user/userRoles.enum'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import AuthBackground from '../../components/auth/AuthBackground'
import { useMutation } from '@apollo/client'
import { setToken } from '../../utilities/tokens-service'
import { checkAuth } from '../../utilities/auth/checkAuth'
import RoleButton from '../../components/auth/RoleButton'
import { SIGN_UP } from '../../graphql/mutations.js/auth.mutations'
import { reload } from '../../utilities/common/reload'




const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRoles | string>('')

    const [singUp, { loading }] = useMutation(SIGN_UP, {
        variables: { createUserInput: { email, password, role } },
        onCompleted: (data) => {
            setToken(data.signup.access_token);
            checkAuth()
            Router.push('/music')
        },
        onError: (error) => console.log(error)
    })

    return (
        <AuthBackground>
            <div className={cn(style.form, style.signUp)}>
                <Input placeholder='Enter email...'
                    type='email'
                    width='medium'
                    onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Enter password...'
                    type='password'
                    width='medium'
                    onChange={(e) => setPassword(e.target.value)} />
                <div className={style.chooseRole}>
                    <div className={style.chooseRoleTitle}>Who are you?</div>
                    <div className={style.chooseRoleBtns}>
                        <RoleButton value={UserRoles.LISTENER}
                            onClick={() => setRole(UserRoles.LISTENER)}
                            selectedRole={role} />
                        <RoleButton value={UserRoles.MUSICIAN}
                            onClick={() => setRole(UserRoles.MUSICIAN)}
                            selectedRole={role} />
                    </div>
                </div>
                <Button text='Sign up' onClick={singUp} disabled={loading} />
                <div>Already have an account?
                    <Link href='/auth/signin'><a>Sign in!</a></Link>
                </div>
            </div>
        </AuthBackground>
    )
}

export default SignUpPage