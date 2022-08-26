import style from '../../styles/auth/AuthBackground.module.scss'

const AuthBackground = ({ children }: any) => {
    return (
        <div className={style.background}>
            <div className={style.backgroundMask}></div>
            {children}
        </div>
    )
}

export default AuthBackground