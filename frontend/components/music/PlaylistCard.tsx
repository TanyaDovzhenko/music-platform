import Link from "next/link"
import { useQuery } from "@apollo/client"
import style from '../../styles/Music/PlaylistCard.module.scss'
import { GET_USER_PROFILE } from "../../graphql/queries/user.queries"
import { GET_PLAYLIST } from "../../graphql/queries/playlist-queries"


interface IPlaylistCardProps {
    name: string
    description: string
    playlistId: number
    authorId: number
}

export default function PlaylistCard({ name, playlistId, description, authorId }: IPlaylistCardProps) {
    const { data: author } = useQuery(GET_USER_PROFILE, { variables: { id: authorId } })
    const { data: playlist } = useQuery(GET_PLAYLIST, { variables: { id: playlistId } })

    return (
        <div className={style.card}>
            <div className={style.title}>
                <Link href={`playlists/${playlistId}`}>
                    <a>{name}</a>
                </Link>
            </div>
            <div className={style.info}>
                <Link href={`profile/${author?.userId}`}>
                    <a>by: {author?.userProfile.name}</a>
                </Link>
                <div>tracks: {playlist?.playlist.tracks?.length}</div>
                <div className={style.description}>{description}</div>
            </div>
        </div >
    )
}