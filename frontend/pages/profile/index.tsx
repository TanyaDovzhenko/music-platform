import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { BASE_SERVER_URL } from "../../utilities/constants";
import style from '../../styles/profile/Profile.module.scss';
import ProfileTabs from "../../components/profile/ProfileTabs";
import { GET_CURRENT_USER, GET_CURRENT_USER_PROFILE } from "../../graphql/queries/user.queries";
import ProfileContent from "../../components/profile/ProfileContent";
import UserRole from "../../components/profile/UserRole";
import CreateClient from "../../graphql/apollo-client";
import { NextPageContext } from "next";


export default function CurrentProfile({ currentUserProfile, currentUser }: any) {
    const [activeTab, setActiveTab] = useState('first impression')
    const changeActiveTag = (tab: string) => setActiveTab(tab)

    return (<MainLayout>
        <div className={style.container}>
            <div className={style.profile}>
                <div className={style.header}>
                    <div className={style.avatar}
                        style={{
                            backgroundImage: `url(${BASE_SERVER_URL + currentUserProfile?.avatar})`
                        }}>
                    </div>
                    <div className={style.info}>
                        <div className={style.infoContainer}>
                            <UserRole userRole={currentUser?.role} />
                            <div className={style.followers}><span>10020</span> followers</div>
                        </div>
                        <div className={style.name}>{currentUserProfile?.name}</div>
                        <div className={style.status}>{currentUserProfile?.status}</div>
                        <div className={style.musicPrefs}>
                            mus prefs
                            {/* {userProfile?.musicStylePreferences.map(
                                (item: any) => <MusicStyleCard name={item.name} id={item.id} />)} */}
                        </div>
                        <div>albums: 100</div>
                        <div>singles: 100</div>
                        <div>all tracks: 100</div>
                    </div>
                </div>
                <ProfileTabs
                    userRole={currentUser?.role}
                    onClick={changeActiveTag}
                    activeTab={activeTab} />
                <div className={style.content}>
                    <ProfileContent
                        isCurrentUser={true}
                        activeTab={activeTab}
                        userProfileId={currentUserProfile?.id} />
                </div>
            </div>
        </div>
    </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    const { data: userProfile } = await client.query({ query: GET_CURRENT_USER_PROFILE })
    const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })

    return {
        props: {
            currentUserProfile: userProfile.currentUserProfile,
            currentUser: currentUser.currentUser
        }
    }
}
