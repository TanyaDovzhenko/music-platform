import { BASE_SERVER_URL } from "../../utilities/constants"
import style from '../../styles/Music/Track.module.scss'
import PlayerState from "../../store/PlayerState";
import cn from 'classnames'
import { observer } from 'mobx-react-lite'


interface ITrackProps {
    id: number,
    playlistId: number,
    name: string,
    image: string,
    audio: string,
    musician: string,
    comments?: any,
    musicStyles?: any,
    album?: any,
    setActivePlaylist: (e: React.MouseEvent<HTMLElement>) => void,
}

const Track = ({
    id, name, image, audio, musician, setActivePlaylist, playlistId, comments, musicStyles, album }
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
        <div className={cn(style.track, { [style.active]: isActive })}
            onClick={clickTrackHandler}>
            <div className={style.mainInfo}>
                <div className={style.img}
                    style={{ backgroundImage: `url(${BASE_SERVER_URL + image})` }}>
                </div>
                <div>
                    <div className={style.name}>{name}</div>
                    <div>{musician}</div>
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