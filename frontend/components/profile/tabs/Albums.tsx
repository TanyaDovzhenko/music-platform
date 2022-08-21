import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_USER_ALBUMS } from '../../../graphql/queries/album-queries'
import style from '../../../styles/profile/Albums.module.scss'
import AbsenceMessage from '../../common/AbsenceMessage'
import Album from '../../music/Album'
import AlbumCreatingPanel from './AlbumCreatingPanel'
import AlbumPage from './AlbumPage'


interface IAlbumsProps {
    isCurrentUser?: boolean
    userProfileId: number
}

export default function Albums({ isCurrentUser, userProfileId }: IAlbumsProps) {
    const { data: userAlbums, refetch: refetchAlbums, loading } = useQuery(GET_USER_ALBUMS,
        { variables: { profileId: userProfileId } });

    const [albumPage, setAlbumPage] = useState(false)
    const [currentAlbumId, setcurrentAlbumId] = useState<number>(0)

    const showAlbumPage = (albumId: number) => {
        setcurrentAlbumId(albumId)
        setAlbumPage(true)
    }

    return (
        <div className={style.container}>
            {albumPage ? <AlbumPage
                isCurrentUser={isCurrentUser}
                setAlbumPage={setAlbumPage}
                albumId={currentAlbumId} /> :
                <>
                    {isCurrentUser &&
                        <AlbumCreatingPanel refetchAlbums={refetchAlbums} loading={loading} />}

                    {!userAlbums?.userAlbums.length && <AbsenceMessage message='albums' />}

                    <div className={style.albumsList}>
                        {userAlbums?.userAlbums.map((item, index) =>
                            <Album key={index}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                image={item.image}
                                tracksNumber={item.tracks.length}
                                authorName={item.authorName}
                                authorUserId={item.authorUserId}
                                isCurrentUser={isCurrentUser}
                                showAlbumPage={showAlbumPage}
                            />)}
                    </div >
                </>}
        </div >)
}


// export async function getServerSideProps(context: NextPageContext) {
//     const client = CreateClient(context);
//     const { data: userProfile } = await client.query({ query: GET_CURRENT_USER_PROFILE })
//     const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })


//     const { data: userAlbums } = await client.query(
//         { query: GET_USER_ALBUMS, variables: { profileId: userProfileId } })

//     return {
//         props: {
//             currentUserProfile: userProfile.currentUserProfile,
//             currentUser: currentUser.currentUser
//         }
//     }
// }
