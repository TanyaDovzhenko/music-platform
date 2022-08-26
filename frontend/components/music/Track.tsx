import cn from 'classnames'
import { BASE_SERVER_URL } from "../../utilities/constants"
import style from '../../styles/Music/Track.module.scss'
import PlayerState from "../../store/PlayerState";
import { observer } from 'mobx-react-lite'
import Link from 'next/link';


interface ITrackProps {
    id: number
    playlistId: number
    name: string
    image: string
    audio: string
    musicianName?: string
    comments?: any
    musicStyles?: any
    album?: any
    userId?: number
    setActivePlaylist: (e: React.MouseEvent<HTMLElement>) => void
}

const Track = ({
    id, name, image, audio, musicianName, setActivePlaylist, userId,
    playlistId, comments, musicStyles, album }
    : ITrackProps) => {

    let isActive =
        PlayerState.activeTrack?.id === id
        && PlayerState.activePlaylist?.id === playlistId

    const clickTrackHandler = async (e: React.MouseEvent<HTMLElement>) => {
        setActivePlaylist(e)
        if (PlayerState.activeTrack?.id === id) {
            PlayerState.togglePlaying()
        }
        else if (PlayerState.activeTrack?.id !== id) {
            PlayerState.changePlayerTrack({ id, name, image, audio })
        }
    }

    return (
        <div onClick={clickTrackHandler}
            className={cn(style.track,
                { [style.active]: isActive })}>
            <div className={style.mainInfo}>
                <div className={style.img}
                    style={{ backgroundImage: `url(${BASE_SERVER_URL + image})` }}>
                </div>
                <div>
                    <div className={style.name}>{name}</div>
                    <div className={style.musicianName} onClick={(e) => e.stopPropagation()}>
                        by: <Link href={`/profile/${userId}`}>
                            <a>{musicianName}</a></Link>
                    </div>
                </div>
            </div>
            {/* <div className={style.addInfo}>
                <div>ALBUM</div>
                <div>RATE</div>
                <div>MUS STYLE</div>
                <div>COMMENTS</div>
            </div> */}
        </div>
    )
}

export default observer(Track)