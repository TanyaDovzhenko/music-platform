import { useQuery } from "@apollo/client";
import { NextPageContext } from "next";
import MainLayout from "../../../layouts/MainLayout";
import UserCard from "../../../components/common/UserCard";
import CreateClient from "../../../graphql/apollo-client";
import style from '../../../styles/people/People.module.scss';
import { USER_FOLLOWED } from "../../../graphql/queries/follow.queries";
import { GET_CURRENT_USER } from "../../../graphql/queries/user.queries";
import PeopleSwitchers from "../../../components/people/PeopleSwitchers";


export default function Followed({ currentUserId }: any) {
    const { data } = useQuery(USER_FOLLOWED, { variables: { followerId: currentUserId } })

    return (
        <MainLayout>
            <PeopleSwitchers />
            <div className={style.userList}>
                {data?.userFollowed.map(item =>
                    <UserCard
                        userId={item.followedId}
                        request={true}
                    />)}
                {!data?.userFollowed.length &&
                    <div className={style.noMessage}>no followers</div>}
            </div>
        </MainLayout >)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);
    const { data: currentUser } = await client.query({ query: GET_CURRENT_USER })
    return { props: { currentUserId: currentUser.currentUser.id } }
}