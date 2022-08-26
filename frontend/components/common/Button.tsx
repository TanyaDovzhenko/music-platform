import cn from 'classnames'
import style from '../../styles/common/Button.module.scss'

interface IButtonProps {
    text?: string
    className?: string
    width: 'small' | 'medium' | 'large' | 'auto'
    disabled?: boolean
    onClick?: (e: any) => void
}

const Button = ({ text, onClick, width, className, disabled }: IButtonProps) => {
    return (
        <button
            className={cn(className, style.button, style[width])}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    width: 'small'
};

export default Button