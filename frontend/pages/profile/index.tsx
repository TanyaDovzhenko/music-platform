import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import style from '../../styles/profile/Profile.module.scss';
import ProfileTabs from "../../components/profile/ProfileTabs";
import { GET_CURRENT_USER, GET_CURRENT_USER_PROFILE } from "../../graphql/queries/user.queries";
import ProfileContent from "../../components/profile/ProfileContent";
import CreateClient from "../../graphql/apollo-client";
import { NextPageContext } from "next";
import { reload } from "../../utilities/common/reload";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { UserRoles } from "../../types/user/userRoles.enum";


export default function CurrentProfile({ currentProfile, currentUser }: any) {
    const [activeTab, setActiveTab] = useState(
        currentUser?.role == (UserRoles.LISTENER).toUpperCase() ? 'music' : 'albums')
    const changeActiveTag = (tab: string) => setActiveTab(tab)

    useEffect(reload, [])
    return (<MainLayout>
        <div className={style.container}>
            <div className={style.profile}>
                <ProfileHeader
                    avatar={currentProfile?.avatar}
                    name={currentProfile?.name}
                    status={currentProfile?.status}
                    styles={currentUser?.styles}
                    userRole={currentUser?.role}
                    isCurrentUser={true}
                    userProfileId={currentProfile?.id}
                    userId={currentUser?.id}
                />
                <ProfileTabs
                    userRole={currentUser?.role}
                    onClick={changeActiveTag}
                    activeTab={activeTab} />
                <ProfileContent
                    userId={currentUser?.id}
                    isCurrentUser={true}
                    activeTab={activeTab}
                    userProfileId={currentProfile?.id}
                    musicianName={currentProfile?.name} />
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
            currentProfile: userProfile.currentUserProfile,
            currentUser: currentUser.currentUser
        }
    }
}
