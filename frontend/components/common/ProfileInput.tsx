import style from '../../styles/common/Input.module.scss'

interface IProfileInputProps {
    placeholder?: string;
    value: string;
    maxСharacters: number;
    width: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({ placeholder, value, maxСharacters, width, onChange }: IProfileInputProps) => {

    return (
        <div
            className={style.profileInputContainer}
            style={{ width: `${width}px` }}>
            <input
                className={style.profileInput}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                maxLength={maxСharacters}
                style={{ width: `${width - 25}px` }}
            />
            <span>{maxСharacters - value.length}</span>
        </div>
    )
}

export default ProfileInput