import { ProfileTabsEnum } from "../../types/profile/profile-tabs"
import Albums from "./tabs/Albums"
import FirstImpression from "./tabs/FirstImpression"
import Posts from "./tabs/Posts"
import Singles from "./tabs/Singles"

interface IProfileContentProps {
    activeTab: string
    userProfileId: number
    isCurrentUser?: boolean
}

export default function ProfileContent({ activeTab, userProfileId, isCurrentUser }: IProfileContentProps) {

    return (<div>
        {
            activeTab == ProfileTabsEnum.POSTS ?
                <Posts /> :

                activeTab == ProfileTabsEnum.FIRST_IMP ?
                    <FirstImpression /> :

                    activeTab == ProfileTabsEnum.REVIEWS ?
                        <div>reviews</div> :

                        activeTab == ProfileTabsEnum.PLAYLISTS ?
                            <div>PLAYLISTS</div> :

                            activeTab == ProfileTabsEnum.ALBUMS ?
                                <Albums
                                    userProfileId={userProfileId}
                                    isCurrentUser={isCurrentUser} /> :

                                activeTab == ProfileTabsEnum.FOLLOWING ?
                                    <div>FOLLOWING</div> :

                                    activeTab == ProfileTabsEnum.SINGLES ?
                                        <Singles
                                            userProfileId={userProfileId}
                                            isCurrentUser={isCurrentUser} /> :
                                        <></>
        }
    </div>)
}