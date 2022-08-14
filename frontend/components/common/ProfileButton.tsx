import style from '../../styles/common/Button.module.scss'

interface IProfileButtonProps {
    text: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
}

const ProfileButton = ({ text, onClick, disabled }: IProfileButtonProps) => {
    return (
        <button
            className={style.profileButton}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    )
}

export default ProfileButton