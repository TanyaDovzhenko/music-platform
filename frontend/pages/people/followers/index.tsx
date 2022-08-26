import { NextPageContext } from "next";
import { useQuery } from "@apollo/client";
import MainLayout from "../../../layouts/MainLayout";
import CreateClient from "../../../graphql/apollo-client";
import UserCard from "../../../components/common/UserCard";
import style from '../../../styles/people/People.module.scss';
import PeopleSwitchers from "../../../components/people/PeopleSwitchers";
import { USER_FOLLOWERS } from "../../../graphql/queries/follow.queries";
import { GET_CURRENT_USER } from "../../../graphql/queries/user.queries";


export default function Followers({ currentUserId }: any) {
    const { data } = useQuery(USER_FOLLOWERS, { variables: { followedId: currentUserId } })

    return (
        <MainLayout>
            <PeopleSwitchers />
            <div className={style.userList}>
                {data?.userFollowers.map(item =>
                    <UserCard
                        userId={item.followedId}
                        request={true}
                    />)}
                {!data?.userFollowers.length &&
                    <div className={style.noMessage}>no followers</div>}
            </div>
        </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })
    return { props: { currentUserId: currentUser.currentUser.id } }
}