import Image from 'next/image'
import { UserRoles } from '../../types/user/userRoles.enum'
import style from '../../styles/profile/Profile.module.scss'
import musicianIcon from '../../images/icons/hand-rock.svg'
import listenerIcon from '../../images/icons/headphones.svg'


interface ITabsProps {
    userRole: UserRoles
}

export default function UserRole({ userRole }: ITabsProps) {

    return (
        <div className={style.role}>
            {userRole === UserRoles.LISTENER.toUpperCase() ?
                <Image src={listenerIcon} /> :
                userRole === UserRoles.MUSICIAN.toUpperCase() ?
                    <Image src={musicianIcon} />
                    : <></>}
            <span>{userRole}</span>
        </div>
    )
}