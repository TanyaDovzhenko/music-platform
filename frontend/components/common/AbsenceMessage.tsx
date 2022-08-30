import style from '../../styles/common/AbsenceMessage.module.scss'

interface IAlbumsProps {
    message: string
}

export default function AbsenceMessage({ message }: IAlbumsProps) {
    return (<div className={style.message}>{message}</div >)
}