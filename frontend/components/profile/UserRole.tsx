import Image from 'next/image'
import cn from 'classnames'
import { UserRoles } from '../../types/user/userRoles.enum'
import style from '../../styles/common/UserRole.module.scss'
import musicianIcon from '../../images/icons/hand-rock.svg'
import listenerIcon from '../../images/icons/headphones.svg'


interface IUserRoleProps {
    userRole: UserRoles
    size: "small" | "large"
}

export default function UserRole({ userRole, size }: IUserRoleProps) {

    return (
        <div className={cn(style.role, style[size])}>
            {userRole === UserRoles.LISTENER.toUpperCase() ?
                <Image
                    src={listenerIcon}
                    width={size == "small" ? 20 : 25}
                    height={size == "small" ? 20 : 25} /> :
                userRole === UserRoles.MUSICIAN.toUpperCase() ?
                    <Image
                        src={musicianIcon}
                        width={size == "small" ? 20 : 25}
                        height={size == "small" ? 20 : 25} />
                    : <></>}
            <span>{userRole}</span>
        </div>
    )
}

UserRole.defaultProps = {
    size: 'large'
}