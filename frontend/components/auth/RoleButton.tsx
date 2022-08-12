import cn from 'classnames'
import Image from 'next/image'
import style from '../../styles/auth/RoleButton.module.scss'
import musicianIcon from '../../images/icons/hand-rock.svg'
import listenerIcon from '../../images/icons/headphones.svg'
import { UserRoles } from '../../types/user/userRoles.enum'

interface IRoleButtonProps {
    value: string
    selectedRole: string
    onClick: () => void
}

export default function RoleButton({ value, onClick, selectedRole }: IRoleButtonProps) {

    return (
        <div className={cn(style.btn, { [style.active]: selectedRole == value })}
            onClick={onClick}>
            {value === UserRoles.LISTENER ?
                <Image src={listenerIcon} /> : <Image src={musicianIcon} />}
            <span className={style.role}>{value}</span>
        </div >
    )
}
