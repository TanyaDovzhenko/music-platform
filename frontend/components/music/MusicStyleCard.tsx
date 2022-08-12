import style from '../../styles/Music/MusicStyleCard.module.scss'

interface IMusicStyleCardProps {
    name: string,
    id: number
}

export default function MusicStyleCard({ name, id }: IMusicStyleCardProps) {
    return (
        <div className={style.card}>
            {name}
        </div >
    )
}