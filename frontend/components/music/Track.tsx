import cn from 'classnames'
import Link from 'next/link';
import Image from 'next/image';
import { observer } from 'mobx-react-lite'
import { useMutation, useQuery } from '@apollo/client';
import { BASE_SERVER_URL } from "../../utilities/constants"
import style from '../../styles/Music/Track.module.scss'
import PlayerState from "../../store/PlayerState";
import { LIKE_TRACK, UNLIKE_TRACK } from '../../graphql/mutations.js/track-mutations';
import heartIcon from '../../images/icons/heart-icon.svg'
import fullHeartIcon from '../../images/icons/full-heart-icon.svg'
import { CHECK_LIKED_TRACK } from '../../graphql/queries/tracks-queries';


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

const Track = ({ id, name, image, audio, musicianName, setActivePlaylist, userId,
    playlistId }: ITrackProps) => {

    const { data: isLiked, refetch: refetchIsLiked } = useQuery(CHECK_LIKED_TRACK, {
        variables: { trackId: id }
    })

    const [likeTrack] = useMutation(LIKE_TRACK, {
        variables: { trackId: id },
        onCompleted: () => refetchIsLiked()
    })

    const [unlikeTrack,] = useMutation(UNLIKE_TRACK, {
        variables: { trackId: id },
        onCompleted: () => refetchIsLiked()
    })

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
                <div className={style.icon}>
                    {isLiked?.checkLikedTrack ?
                        <Image
                            src={fullHeartIcon}
                            width={20}
                            height={20}
                            onClick={(e) => {
                                e.stopPropagation()
                                unlikeTrack()
                            }} />
                        : <Image
                            src={heartIcon}
                            width={20}
                            height={20}
                            onClick={(e) => {
                                e.stopPropagation()
                                likeTrack()
                            }} />}
                </div>
            </div>
        </div>
    )
}

export default observer(Track)