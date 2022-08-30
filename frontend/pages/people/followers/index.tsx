import { NextPageContext } from "next";
import { useQuery } from "@apollo/client";
import MainLayout from "../../../layouts/MainLayout";
import CreateClient from "../../../graphql/apollo-client";
import UserCard from "../../../components/common/UserCard";
import style from '../../../styles/common/UserList.module.scss';
import PeopleSwitchers from "../../../components/people/PeopleSwitchers";
import { USER_FOLLOWERS } from "../../../graphql/queries/follow.queries";
import { GET_CURRENT_USER } from "../../../graphql/queries/user.queries";
import AbsenceMessage from "../../../components/common/AbsenceMessage";
import { useEffect } from "react";


export default function Followers({ currentUserId }: any) {
    const { data, refetch } = useQuery(USER_FOLLOWERS,
        { variables: { followedId: currentUserId } })

    useEffect(() => { refetch() }, [])
    return (
        <MainLayout>
            <PeopleSwitchers />
            <div className={style.userList}>
                {data?.userFollowers.map(item =>
                    <UserCard userId={item.followerId} request={true} small={true} />)}
                {!data?.userFollowers.length &&
                    <AbsenceMessage message="no followers" />}
            </div>
        </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    try {
        const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })
        return { props: { currentUserId: currentUser.currentUser.id } }
    }
    catch { return { props: { currentUserId: null } } }
}