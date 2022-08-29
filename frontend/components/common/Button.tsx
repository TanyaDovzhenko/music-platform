import cn from 'classnames'
import style from '../../styles/common/Button.module.scss'

interface IButtonProps {
    text?: string
    type?: "button" | "submit" | "reset"
    width: 'small' | 'medium' | 'large' | 'auto'
    disabled?: boolean
    onClick?: (e: any) => void
}

const Button = ({ text, onClick, width, type, disabled }: IButtonProps) => {
    return (
        <button className={cn(style.button, style[width])}
            onClick={onClick}
            disabled={disabled}
            type={type}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    width: 'small'
};

export default Button