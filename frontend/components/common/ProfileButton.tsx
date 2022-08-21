import cn from 'classnames';
import style from '../../styles/common/Button.module.scss'

interface IProfileButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
    transparent?: boolean
}

const ProfileButton = ({ text, onClick, disabled, transparent }: IProfileButtonProps) => {
    return (
        <button
            className={cn(style.profileButton, { [style.transparent]: transparent })}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    )
}

export default ProfileButton