import style from '../../styles/profile/Profile.module.scss';
import { ProfileTabsEnum } from "../../types/profile/profile-tabs"
import LikedTracks from '../music/LikedTracks';
import Albums from "./tabs/Albums"
import Followings from './tabs/Followings';
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
            activeTab == ProfileTabsEnum.LIKED_TRACKS ?
                <LikedTracks userProfileId={userProfileId} /> :

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