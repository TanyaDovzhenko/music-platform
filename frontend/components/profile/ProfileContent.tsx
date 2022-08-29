import style from '../../styles/profile/Profile.module.scss';
import { ProfileTabsEnum } from "../../types/profile/profile-tabs"
import Albums from "./tabs/Albums"
import Followings from './tabs/Followings';
import Posts from "./tabs/Posts"
import Singles from "./tabs/TracksList"

interface IProfileContentProps {
    activeTab: string
    userProfileId: number
    isCurrentUser?: boolean
    musicianName: string
    userId: number
}

export default function ProfileContent({ activeTab, userProfileId,
    isCurrentUser, musicianName, userId }: IProfileContentProps) {

    return (<div className={style.content}>
        {
            activeTab == ProfileTabsEnum.PLAYLISTS ?
                <div>PLAYLISTS</div> :

                activeTab == ProfileTabsEnum.ALBUMS ?
                    <Albums
                        userProfileId={userProfileId}
                        isCurrentUser={isCurrentUser} /> :

                    activeTab == ProfileTabsEnum.FOLLOWING ?
                        <Followings userId={userId} /> :

                        activeTab == ProfileTabsEnum.SINGLES ?
                            <Singles
                                userId={userId}
                                userProfileId={userProfileId}
                                isCurrentUser={isCurrentUser}
                                musicianName={musicianName} /> :
                            <></>
        }
    </div>)
}