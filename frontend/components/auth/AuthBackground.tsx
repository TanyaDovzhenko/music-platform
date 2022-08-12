import style from '../../styles/auth/AuthBackground.module.scss'

const AuthBackground = ({ children }: any) => {


    return (
        <div className={style.container}>
            <div className={style.info}>
                <div className={style.titleContainer}>
                    <div className={style.background}></div>
                    <div className={style.title}>
                        <span>NEW</span>
                        <span>GENERATION</span>
                        <span>OF</span>
                        <span>MUSICIANS</span>
                        <span className={style.titleSub}>is growing before your eyes</span>
                    </div>
                </div>
                <div className={style.form}>
                    {children}
                </div>
            </div>
            <div className={style.image}>
            </div>
        </div>
    )
}

export default AuthBackground