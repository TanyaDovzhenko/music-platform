import cn from 'classnames'
import style from '../../styles/common/Input.module.scss'

interface IInputProps {
    placeholder?: string;
    type?: 'email' | 'text' | 'password';
    className?: string;
    width: 'small' | 'medium';
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, type, className, width, onChange }: IInputProps) => {
    return (
        <input
            className={cn(className, style.input, style[width])}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
        />
    )
}

Input.defaultProps = {
    width: 'small',
    type: 'text'
};

export default Input