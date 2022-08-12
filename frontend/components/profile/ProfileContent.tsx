import Posts from "../../pages/posts"
import { ProfileTabsEnum } from "../../types/profile/profile-tabs"

interface IProfileContentProps {
    activeTab: string
}

export default function ProfileContent({ activeTab }: IProfileContentProps) {
    //event.target.getAttribute('data-tag')

    return (<div>
        {
            activeTab == ProfileTabsEnum.POSTS ? <div></div> :
                activeTab == ProfileTabsEnum.REVIEWS ? <div>reviews</div> :
                    activeTab == ProfileTabsEnum.PLAYLISTS ? <div>PLAYLISTS</div> :
                        activeTab == ProfileTabsEnum.ALBUMS ? <div>ALBUMS</div> :
                            activeTab == ProfileTabsEnum.FOLLOWING ? <div>FOLLOWING</div> :
                                activeTab == ProfileTabsEnum.FIRST_IMP ? <div>FIRST_IMP</div> :
                                    activeTab == ProfileTabsEnum.SINGLES ? <div>SINGLES</div> :
                                        <></>
        }
    </div>)
}