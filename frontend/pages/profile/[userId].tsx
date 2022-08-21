import { useEffect, useState } from "react";
import Router from 'next/router'
import MainLayout from "../../layouts/MainLayout";
import { BASE_SERVER_URL } from "../../utilities/constants";
import style from '../../styles/profile/Profile.module.scss';
import ProfileTabs from "../../components/profile/ProfileTabs";
import { GET_USER, GET_PROFILE_BY_USER_ID, GET_CURRENT_USER } from "../../graphql/queries/user.queries";
import ProfileContent from "../../components/profile/ProfileContent";
import UserRole from "../../components/profile/UserRole";
import CreateClient from "../../graphql/apollo-client";
import { NextPageContext } from "next";


export default function Profile({ user, userProfile, currentUserId }: any) {
    const [activeTab, setActiveTab] = useState('first impression')

    const changeActiveTag = (tab: string) => setActiveTab(tab)

    useEffect(() => {
        if (user.id === currentUserId) Router.push('/profile')
    }, [])

    return (<MainLayout>
        <div className={style.container}>
            <div className={style.background}></div>
            <div className={style.profile}>
                <div className={style.header}>
                    <div className={style.avatar}
                        style={{
                            backgroundImage: `url(${BASE_SERVER_URL + userProfile?.avatar})`
                        }}>
                    </div>
                    <div className={style.info}>
                        <div className={style.infoContainer}>
                            <UserRole userRole={user?.role} />
                            <div className={style.followers}><span>10020</span> followers</div>
                        </div>
                        <div className={style.name}>{userProfile?.name}</div>
                        <div className={style.status}>{userProfile?.status}</div>
                        <div className={style.musicPrefs}>
                            mus prefs
                            {/* {userProfile?.musicStylePreferences.map(
                                (item: any) => <MusicStyleCard name={item.name} id={item.id} />)} */}
                        </div>
                    </div>
                </div>
                <div className={style.content}>
                    <ProfileTabs
                        userRole={user?.role}
                        onClick={changeActiveTag}
                        activeTab={activeTab} />
                    <ProfileContent
                        activeTab={activeTab}
                        userProfileId={userProfile?.id} />
                </div>
            </div>
        </div>
    </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    const userId = Number(context.query.userId)

    const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })

    const { data: userProfile } = await client.query({
        query: GET_PROFILE_BY_USER_ID, variables: { userId }
    })
    const { data: user } = await client.query({
        query: GET_USER, variables: { id: userId }
    })

    return {
        props: {
            user: user.user,
            userProfile: userProfile.userProfileByUserId,
            currentUserId: currentUser.currentUser.id
        }
    }
}
