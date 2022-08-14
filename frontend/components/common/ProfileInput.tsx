import style from '../../styles/common/Input.module.scss'

interface IProfileInputProps {
    placeholder?: string;
    value: string;
    maxСharacters?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({ placeholder, value, maxСharacters, onChange }: IProfileInputProps) => {
    return (
        <input
            className={style.profileInput}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            max={maxСharacters}
        />
    )
}

export default ProfileInput