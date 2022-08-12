import style from '../styles/Logout.module.scss'
import logoutIcon from '../images/icons/logout-icon.svg'
import Image from 'next/image'
import { logout } from '../../utilities/auth/logout'


export default function Logout() {
    return (
        <div className={style.containter} onClick={logout}>
            <Image src={logoutIcon} />
            <span className={style.text}>Log out</span>
        </div>
    )
}