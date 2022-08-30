import Link from 'next/link'
import ProfileButton from '../common/ProfileButton'
import style from '../../styles/music/Album.module.scss'
import { BASE_SERVER_URL } from '../../utilities/constants'


interface IAlbumProps {
    id: number
    name: string
    description: string
    image: string
    tracksNumber: number
    authorName: string
    authorUserId: number
    isCurrentUser?: boolean
    showAlbumPage: any
}

export default function Album({ id, name, description, image, tracksNumber,
    authorName, authorUserId, showAlbumPage }: IAlbumProps) {

    return (
        <div className={style.album}
            style={{ backgroundImage: `url(${BASE_SERVER_URL + image})` }}>
            <div className={style.background}></div>
            <div className={style.img}
                style={{ backgroundImage: `url(${BASE_SERVER_URL + image})` }}>
            </div>
            <div className={style.info}>
                <div className={style.name}>{name}</div>
                <Link href={`/profile/${authorUserId}`}>
                    <a className={style.authorName}>by: <span>{authorName}</span></a>
                </Link>
                <div className={style.description}>{description}</div>
            </div>
            <div className={style.addTrackBtn}>
                <ProfileButton
                    onClick={() => showAlbumPage(id)}
                    text='open'
                    transparent={true} />
            </div>
            <div className={style.addInfo}>
                <div className={style.tracksNumber}>tracks: {tracksNumber}</div>
            </div>
        </div >
    )
}
