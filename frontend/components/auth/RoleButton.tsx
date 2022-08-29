import cn from 'classnames'
import style from '../../styles/auth/RoleButton.module.scss'

interface IRoleButtonProps {
    value?: string
    id?: any
    selectedRole: string
    onClick?: any
}

export default function RoleButton({ value, onClick, selectedRole, id }: IRoleButtonProps) {

    return (
        <button
            className={cn(style.btn, { [style.active]: selectedRole == value })}
            id={id}
            type="button"
            onClick={onClick}
            value={value}>
            {value}
        </button >
    )
}

