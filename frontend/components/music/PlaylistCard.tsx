import { BASE_SERVER_USR } from "../../utilities/constants"
import style from '../../styles/Music/PlaylistCard.module.scss'
import Link from "next/link"

interface IPlaylistCardProps {
    name: string,
    author: string,
    img?: string,
    playlistId: number
}

export default function PlaylistCard({ name, author, img, playlistId }: IPlaylistCardProps) {

    return (
        <div className={style.card}>
            <img src={BASE_SERVER_USR + img} alt="" />
            <div className={style.title}>
                <Link href={`playlists/${playlistId}`}>
                    <a>{name}</a>
                </Link>
            </div>
            <div>by: {author}</div>
        </div>
    )
}