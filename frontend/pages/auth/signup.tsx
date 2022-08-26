import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'
import cn from 'classnames'
import style from '../../styles/auth/Forms.module.scss'
import { UserRoles } from '../../types/user/userRoles.enum'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import AuthBackground from '../../components/auth/AuthBackground'
import { useMutation, useQuery } from '@apollo/client'
import { setToken } from '../../utilities/tokens-service'
import { checkAuth } from '../../utilities/auth/checkAuth'
import RoleButton from '../../components/auth/RoleButton'
import { SIGN_UP } from '../../graphql/mutations.js/auth.mutations'
import { GET_ALL_STYLES } from '../../graphql/queries/style-queries'
import MusicStyleCard from '../../components/music/MusicStyleCard'


const SignUpPage = () => {
    const { data: styles } = useQuery(GET_ALL_STYLES)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRoles | string>('')
    const [stylesIds, setStylesIds] = useState<number[]>([])

    const [singUp, { loading }] = useMutation(SIGN_UP, {
        variables: { createUserInput: { email, password, role, stylesIds } },
        onCompleted: (data) => {
            setToken(data.signup.access_token);
            checkAuth()
            Router.push('/profile')
        },
        onError: (error) => console.log(error)
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
                {role == UserRoles.MUSICIAN &&
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
                <Button text='Sign up' onClick={singUp} disabled={loading} />
                <div className={style.message}> Already have an account?
                    <Link href='/auth/signin'><a>Sign in!</a></Link>
                </div>
            </div>
        </AuthBackground>
    )
}

export default SignUpPage