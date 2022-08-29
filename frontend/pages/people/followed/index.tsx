import { useQuery } from "@apollo/client";
import { NextPageContext } from "next";
import MainLayout from "../../../layouts/MainLayout";
import UserCard from "../../../components/common/UserCard";
import CreateClient from "../../../graphql/apollo-client";
import style from '../../../styles/common/UserList.module.scss';
import { USER_FOLLOWED } from "../../../graphql/queries/follow.queries";
import { GET_CURRENT_USER } from "../../../graphql/queries/user.queries";
import PeopleSwitchers from "../../../components/people/PeopleSwitchers";
import AbsenceMessage from "../../../components/common/AbsenceMessage";
import { useEffect } from "react";


export default function Followed({ currentUserId }: any) {
    const { data, refetch } = useQuery(USER_FOLLOWED,
        { variables: { followerId: currentUserId } })

    useEffect(() => { refetch() }, [])
    return (
        <MainLayout>
            <PeopleSwitchers />
            <div className={style.userList}>
                {data?.userFollowed.map(item =>
                    <UserCard userId={item.followedId} request={true} small={true} />)}
                {!data?.userFollowed.length &&
                    <AbsenceMessage message="no followed" />}
            </div>
        </MainLayout >)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    try {
        const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })
        return { props: { currentUserId: currentUser.currentUser.id } }
    }
    catch { return { props: { currentUserId: null } } }
}