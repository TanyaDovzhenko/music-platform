import { NextPageContext } from "next";
import CreateClient from "../../graphql/apollo-client";
import { GET_USERS } from "../../graphql/queries/user.queries";
import MainLayout from "../../layouts/MainLayout";

export default function Suggestions({ users }: any) {

    return (<MainLayout>
        {JSON.stringify(users)}
    </MainLayout>)
}

export async function getServerSideProps(context: NextPageContext) {
    const client = CreateClient(context);

    const { data } = await client.query({ query: GET_USERS })
    return { props: { users: data.users } }
}