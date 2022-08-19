import { NextPageContext } from "next"
import { ProfileTabsEnum } from "../../types/profile/profile-tabs"
import Albums from "./tabs/Albums"
import FirstImpression from "./tabs/FirstImpression"
import Posts from "./tabs/Posts"
import Singles from "./tabs/Singles"

interface IProfileContentProps {
    activeTab: string
    userProfileId: number
    currentUser?: boolean
}

export default function ProfileContent({ activeTab, userProfileId, currentUser }: IProfileContentProps) {

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
                                    currentUser={currentUser} /> :

                                activeTab == ProfileTabsEnum.FOLLOWING ?
                                    <div>FOLLOWING</div> :

                                    activeTab == ProfileTabsEnum.SINGLES ?
                                        <Singles
                                            userProfileId={userProfileId}
                                            currentUser={currentUser} /> :
                                        <></>
        }
    </div>)
}