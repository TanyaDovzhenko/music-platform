import { useState } from "react";
import { NextPageContext } from "next";
import MainLayout from "../../layouts/MainLayout";
import CreateClient from "../../graphql/apollo-client";
import { BASE_SERVER_USR } from "../../utilities/constants";
import style from '../../styles/profile/Profile.module.scss';
import ProfileTabs from "../../components/profile/ProfileTabs";
import MusicStyleCard from "../../components/music/MusicStyleCard";
import { GET_USER_PROFILE } from "../../graphql/queries/user.queries";
import ProfileContent from "../../components/profile/ProfileContent";


export default function Profile({ userProfile }: any) {
    const [activeTab, setActiveTab] = useState('')

    const changeActiveTag = (tab: string) => {
        setActiveTab(tab)
    }

    console.log(activeTab)
    return (<MainLayout>
        <div className={style.container} style={{
            backgroundImage: `url(${BASE_SERVER_USR + userProfile?.avatar})`
        }}>
            <div className={style.background}></div>
            <div className={style.profile}>
                <div className={style.header}>
                    <div className={style.avatar}
                        style={{
                            backgroundImage: `url(${BASE_SERVER_USR + userProfile?.avatar})`
                        }}>
                    </div>
                    <div className={style.info}>
                        <div className={style.infoContainer}>
                            <div className={style.role}>LISTENER</div>
                            <div className={style.followers}><span>10020</span> followers</div>
                        </div>
                        <div className={style.name}>Name long</div>
                        <div className={style.status}>Status привет котики я люблю слушать музыку и кушать варенички с вишей много.Status привет котики я люблю слушать музыку и кушать варенички с вишей много</div>
                        <div className={style.musicPrefs}>
                            {userProfile?.musicStylePreferences.map(
                                (item: any) => <MusicStyleCard name={item.name} id={item.id} />)}
                        </div>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.contentHeader}>
                        <ProfileTabs userRole="Musician" onClick={changeActiveTag} />
                    </div>
                    <ProfileContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    const { data } = await client.query({ query: GET_USER_PROFILE })

    return { props: { userProfile: data.userProfile } }
}