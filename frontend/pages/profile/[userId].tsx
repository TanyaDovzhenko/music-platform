import {
    GET_USER,
    GET_PROFILE_BY_USER_ID,
    GET_CURRENT_USER
} from "../../graphql/queries/user.queries";
import Router from 'next/router';
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import style from '../../styles/profile/Profile.module.scss';
import ProfileTabs from "../../components/profile/ProfileTabs";
import ProfileContent from "../../components/profile/ProfileContent";
import CreateClient from "../../graphql/apollo-client";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { UserRoles } from "../../types/user/userRoles.enum";


export default function Profile({ user, userProfile, currentUserId }: any) {
    const [activeTab, setActiveTab] = useState(
        userProfile?.role == (UserRoles.LISTENER).toUpperCase() ? 'liked tracks' : 'albums')
    const changeActiveTag = (tab: string) => setActiveTab(tab)

    useEffect(() => {
        if (user.id === currentUserId) Router.push('/profile')
    }, [])

    return (<MainLayout>
        <div className={style.container}>
            <div className={style.background}></div>
            <div className={style.profile}>
                <ProfileHeader
                    avatar={userProfile?.avatar}
                    name={userProfile?.name}
                    status={userProfile?.status}
                    styles={user?.styles}
                    userRole={user?.role}
                    userProfileId={userProfile?.id}
                    userId={user?.id}
                />
                <ProfileTabs
                    userRole={user?.role}
                    onClick={changeActiveTag}
                    activeTab={activeTab} />
                <ProfileContent
                    activeTab={activeTab}
                    musicianName={userProfile?.name}
                    userId={user?.id}
                    userProfileId={userProfile?.id} />
            </div>
        </div>
    </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    const userId = Number(context.query.userId)

    try {
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
    catch {
        return {
            props: { user: null, userProfile: null, currentUserId: null }
        }
    }
}
