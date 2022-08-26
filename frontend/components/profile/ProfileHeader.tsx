import { useQuery } from '@apollo/client';
import { GET_USER_ALBUMS } from '../../graphql/queries/album-queries';
import { USER_FOLLOWERS } from '../../graphql/queries/follow.queries';
import { GET_USER_SINGLES } from '../../graphql/queries/profile-tracks.queries';
import style from '../../styles/profile/Profile.module.scss';
import { UserRoles } from '../../types/user/userRoles.enum';
import { BASE_SERVER_URL } from '../../utilities/constants';
import StylesPanel from '../music/StylesPanel';
import ProfileStatus from './ProfileStatus';
import UserRole from './UserRole';


interface IProfileHeaderProps {
    avatar: string
    userRole: UserRoles
    name: string
    status: string
    styles: any
    isCurrentUser?: boolean
    userProfileId: number
    userId: number
}


export default function ProfileHeader({ avatar, userRole, name,
    status, styles, isCurrentUser, userProfileId, userId }: IProfileHeaderProps) {

    const { data: userAlbums } = useQuery(GET_USER_ALBUMS,
        { variables: { profileId: userProfileId } })
    const { data: singles } = useQuery(GET_USER_SINGLES,
        { variables: { profileId: userProfileId } })

    const { data: followers } = useQuery(USER_FOLLOWERS,
        { variables: { followedId: userId } })

    return (
        <div className={style.header}>
            <div className={style.avatar}
                style={{ backgroundImage: `url(${BASE_SERVER_URL + avatar})` }}>
            </div>
            <div className={style.info}>
                <div className={style.infoContainer}>
                    <div className={style.counts}>
                        {userRole == UserRoles.MUSICIAN && <>
                            <div>albums: {userAlbums?.userAlbums.length}</div>
                            <div>singles: {singles?.singles.length}</div>
                        </>}
                        <div className={style.followers}>
                            {followers?.userFollowers.length} followers
                        </div>
                    </div>
                </div>
                <UserRole userRole={userRole} />
                <div className={style.name}>{name}</div>
                <ProfileStatus text={status} isCurrentUser={isCurrentUser} />
                <div className={style.styles}>
                    <StylesPanel styles={styles} />
                </div>
            </div>
        </div >
    )
}
