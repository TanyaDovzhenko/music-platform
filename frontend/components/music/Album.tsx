import Link from 'next/link'
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
}

export default function Album({
    id, name, description, image, tracksNumber,
    authorName, authorUserId
}: IAlbumProps) {

    return (
        <div className={style.album}>
            <div className={style.img}
                style={{ backgroundImage: `url(${BASE_SERVER_URL + image})` }}>
            </div>
            <div className={style.info}>
                <div className={style.name}>{name}</div>
                <Link href={`/profile/${authorUserId}`}>
                    <a className={style.authorName}>by: <span>{authorName}</span></a>
                </Link>
                <div className={style.description}>{description} dgdf gsdfgdsfg fdgds fg sdfgsdfgdf dsfgsd fgsdfgdsfgds fgsdfg d</div>
            </div>
            <div className={style.tracksNumber}>tracks: {tracksNumber}</div>
        </div >
    )
}
