import Image from 'next/image'
import style from '../../styles/common/Logout.module.scss'
import logoutIcon from '../../images/icons/logout-icon.svg'
import { logout } from '../../utilities/auth/logout'


export default function Logout() {
    return (
        <div className={style.containter} onClick={logout}>
            <Image src={logoutIcon} width={18} height={18} />
            <span className={style.text}>log out</span>
        </div>
    )
}