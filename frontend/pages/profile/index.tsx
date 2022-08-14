import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { BASE_SERVER_URL } from "../../utilities/constants";
import style from '../../styles/profile/Profile.module.scss';
import ProfileTabs from "../../components/profile/ProfileTabs";
import { GET_CURRENT_USER, GET_USER_PROFILE } from "../../graphql/queries/user.queries";
import ProfileContent from "../../components/profile/ProfileContent";
import { useQuery } from "@apollo/client";
import UserRole from "../../components/profile/UserRole";


export default function Profile() {
    const { data: userProfile } = useQuery(GET_USER_PROFILE)
    const { data: currentUser } = useQuery(GET_CURRENT_USER)
    const profile = userProfile?.currentUserProfile

    const [activeTab, setActiveTab] = useState('first impression')
    const changeActiveTag = (tab: string) => {
        setActiveTab(tab)
    }

    return (<MainLayout>
        <div className={style.container} style={{
            backgroundImage: `url(${BASE_SERVER_URL + profile?.avatar})`
        }}>
            <div className={style.background}></div>
            <div className={style.profile}>
                <div className={style.header}>
                    <div className={style.avatar}
                        style={{
                            backgroundImage: `url(${BASE_SERVER_URL + profile?.avatar})`
                        }}>
                    </div>
                    <div className={style.info}>
                        <div className={style.infoContainer}>
                            <UserRole userRole={currentUser?.currentUser?.role} />
                            <div className={style.followers}><span>10020</span> followers</div>
                        </div>
                        <div className={style.name}>{profile?.name}</div>
                        <div className={style.status}>{profile?.status}</div>
                        <div className={style.musicPrefs}>
                            mus prefs
                            {/* {userProfile?.musicStylePreferences.map(
                                (item: any) => <MusicStyleCard name={item.name} id={item.id} />)} */}
                        </div>
                    </div>
                </div>
                <div className={style.content}>
                    <ProfileTabs
                        userRole={currentUser?.currentUser?.role}
                        onClick={changeActiveTag}
                        activeTab={activeTab} />
                    <ProfileContent
                        activeTab={activeTab}
                        userProfileId={profile?.id} />
                </div>
            </div>
        </div>
    </MainLayout>)
}