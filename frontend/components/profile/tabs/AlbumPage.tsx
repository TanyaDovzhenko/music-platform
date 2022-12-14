import Link from 'next/link'
import Image from 'next/image'
import Track from '../../music/Track'
import { useQuery } from '@apollo/client'
import { GET_ALBUM } from '../../../graphql/queries/album-queries'
import style from '../../../styles/music/AlbumPage.module.scss'
import { BASE_SERVER_URL } from '../../../utilities/constants'
import { setActivePlaylist } from '../../../utilities/music/set-active-playlist'
import arrowIcon from '../../../images/icons/arrow-back-icon.svg'
import TrackCreatingPanel from './TrackCreatingPanel'


interface IAlbumPageProps {
    setAlbumPage: any
    albumId: number
    isCurrentUser?: boolean
}

export default function AlbumPage({ setAlbumPage, albumId, isCurrentUser }: IAlbumPageProps) {
    const { data, refetch } = useQuery(GET_ALBUM, { variables: { id: albumId } })
    const album = data?.album
    const playlistId = Math.random() * Math.random()

    return (
        <div className={style.container}>
            <span className={style.backBtn} onClick={() => setAlbumPage(false)}>
                <Image src={arrowIcon} width={12} /> back to albums
            </span>
            <div className={style.albumPage}>
                <div className={style.img}
                    style={{ backgroundImage: `url(${BASE_SERVER_URL + album?.image})` }}>
                </div>
                <div className={style.info}>
                    <div className={style.name}>{album?.name}</div>
                    <Link href={`/profile/${album?.authorUserId}`}>
                        <a className={style.authorName}>by: <span>{album?.authorName}</span></a>
                    </Link>
                    <div className={style.description}>{album?.description}</div>
                    <div className={style.addInfo}>
                        <div className={style.styles}></div>
                        <div className={style.tracksNumber}>tracks: {album?.tracks?.length}</div>
                    </div>
                </div>
            </div>
            <div className={style.tracks}>
                {isCurrentUser ?
                    <div className={style.createPanel}>
                        <TrackCreatingPanel albumId={albumId} refetchTracks={refetch} />
                    </div>
                    : <div></div>
                }
                {album?.tracks?.map((item) =>
                    <Track
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        audio={item.audio}
                        playlistId={playlistId}
                        setActivePlaylist={(e) => setActivePlaylist(e, album?.tracks, playlistId)}
                        key={item.id}
                        musicianName={album?.authorName}
                        userId={album?.authorUserId}
                    />)}
            </div>

            <div className={style.reviews}>
            </div>
            <div className={style.comments}>
            </div>
        </div >)
}