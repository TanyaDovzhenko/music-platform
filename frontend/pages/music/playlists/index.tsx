import { useQuery } from "@apollo/client";
import { NextPageContext } from "next";
import Button from "../../../components/common/Button";
import MusicSwitchers from "../../../components/music/MusicSwitchers";
import PlaylistCard from "../../../components/music/PlaylistCard";
import CreateClient from "../../../graphql/apollo-client";
import { GET_USER_PLAYLISTS } from "../../../graphql/queries/music-queries";
import MainLayout from "../../../layouts/MainLayout";
import style from '../../../styles/Music/Playlists.module.scss'



export default function Playlists({ userPlaylists }: any) {
    //const { data } = useQuery(GET_USER_PLAYLISTS)

    return (
        <MainLayout>
            <div className={style.header}>
                <MusicSwitchers />
                <Button text="+ Create playlist" width="medium" />
            </div>
            <div className={style.list}>
                {userPlaylists?.map((item: any) =>
                    <PlaylistCard
                        img={item.image}
                        name={item.name}
                        author={'author'}
                        playlistId={item.id}
                    />)}
            </div>
        </MainLayout >)
}

export async function getStaticProps(ctx: NextPageContext) {
    const client = CreateClient(ctx);
    //const { data: playlists } = await client.query({ query: GET_USER_PLAYLISTS })
    // const { data: playlists } = await client.query({ query: GET_USER_PLAYLISTS })

    return { props: {} }
}


