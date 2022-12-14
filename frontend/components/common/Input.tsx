import cn from 'classnames'
import style from '../../styles/common/Input.module.scss'

interface IInputProps {
    placeholder?: string
    type?: 'email' | 'text' | 'password'
    className?: string
    width: 'small' | 'medium'
    onChange?: any
    value?: string
    id?: any
    onBlur?: any
}

const Input = ({ placeholder, type, className, width, onChange, value, id, onBlur }
    : IInputProps) => {
    return (
        <input
            className={cn(className, style.input, style[width])}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            value={value}
            id={id}
            onBlur={onBlur}
        />
    )
}

Input.defaultProps = {
    width: 'small',
    type: 'text'
};

export default Input