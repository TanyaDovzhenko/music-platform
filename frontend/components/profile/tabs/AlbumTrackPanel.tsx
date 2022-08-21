import Track from '../../music/Track'
import ProfileButton from '../../common/ProfileButton'
import TrackCreatingPanel from './TrackCreatingPanel'
import style from '../../../styles/music/AlbumTrackPanel.module.scss'
import { setActivePlaylist } from '../../../utilities/music/set-active-playlist'
import { useQuery } from '@apollo/client'
import { GET_ALBUM } from '../../../graphql/queries/album-queries'

interface IAlbumTrackPanelProps {
    albumId?: number
    isCurrentUser?: boolean
}

export default function AlbumTrackPanel({ albumId, isCurrentUser }: IAlbumTrackPanelProps) {
    const { data: album, refetch } = useQuery(GET_ALBUM, { variables: { id: albumId } })
    const plylistId = Math.random() * Math.random()

    return (
        <div className={style.container}>
            <div className={style.creatingPanel}>

            </div>
            <div className={style.tracks}>
                {album?.album.tracks?.map((item) =>
                    <Track
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        audio={item.audio}
                        playlistId={plylistId}
                        setActivePlaylist={(e) => setActivePlaylist(e, album?.album.tracks, plylistId)}
                        key={item.id}
                        albumView={true}
                    />)}
            </div>
        </div >
    )
}