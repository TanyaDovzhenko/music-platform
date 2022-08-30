import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_USER_ALBUMS } from '../../../graphql/queries/album-queries'
import style from '../../../styles/profile/Albums.module.scss'
import AbsenceMessage from '../../common/AbsenceMessage'
import Album from '../../music/Album'
import AlbumCreatingPanel from './AlbumCreatingPanel'
import AlbumPage from './AlbumPage'


interface IAlbumsProps {
    albums?: any
    isCurrentUser?: boolean
    userProfileId?: number
}

export default function Albums({ albums, isCurrentUser, userProfileId }: IAlbumsProps) {
    const [getAlbums, { data: userAlbums, refetch: refetchAlbums, loading }] =
        useLazyQuery(GET_USER_ALBUMS,
            { variables: { profileId: userProfileId } });

    const [albumPage, setAlbumPage] = useState(false)
    const [currentAlbumId, setcurrentAlbumId] = useState<number>(0)

    const showAlbumPage = (albumId: number) => {
        setcurrentAlbumId(albumId)
        setAlbumPage(true)
    }

    useEffect(() => { if (!albums) getAlbums() }, [])
    return (
        <div className={style.container}>
            {albumPage ? <AlbumPage
                isCurrentUser={isCurrentUser}
                setAlbumPage={setAlbumPage}
                albumId={currentAlbumId} /> :
                <>
                    {isCurrentUser &&
                        <AlbumCreatingPanel
                            refetchAlbums={refetchAlbums}
                            loading={loading} />}

                    {(!userAlbums?.userAlbums.length && !albums?.length)
                        && <AbsenceMessage message='no albums' />}

                    <div className={style.albumsList}>
                        {albums?.map((item, index) =>
                            <Album key={index}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                tracksNumber={item.tracks?.length}
                                authorName={item.authorName}
                                authorUserId={item.authorUserId}
                                isCurrentUser={isCurrentUser}
                                showAlbumPage={showAlbumPage}
                            />)}
                        {userAlbums?.userAlbums.map((item, index) =>
                            <Album key={index}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                tracksNumber={item.tracks?.length}
                                authorName={item.authorName}
                                authorUserId={item.authorUserId}
                                isCurrentUser={isCurrentUser}
                                showAlbumPage={showAlbumPage}
                            />)}
                    </div >
                </>}
        </div >)
}