import { useQuery } from '@apollo/client'
import { GET_USER_ALBUMS } from '../../../graphql/queries/album-queries'
import style from '../../../styles/profile/Albums.module.scss'
import Album from '../../music/Album'
import AlbumCreatingPanel from './AlbumCreatingPanel'


interface IAlbumsProps {
    currentUser?: boolean
    userProfileId: number
}

export default function Albums({ currentUser, userProfileId }: IAlbumsProps) {
    const { data: userAlbums, refetch: refetchAlbums, loading } = useQuery(GET_USER_ALBUMS,
        { variables: { profileId: userProfileId } });

    return (
        <div className={style.container}>
            {currentUser &&
                <AlbumCreatingPanel refetchAlbums={refetchAlbums} loading={loading} />}

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
                    />)}
            </div >
        </div >)
}
