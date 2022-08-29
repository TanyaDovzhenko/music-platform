import { useQuery } from "@apollo/client";
import MainLayout from "../../../layouts/MainLayout";
import Button from "../../../components/common/Button";
import style from '../../../styles/Music/Playlists.module.scss'
import MusicSwitchers from "../../../components/music/MusicSwitchers";
import PlaylistCard from "../../../components/music/PlaylistCard";
import { GET_CURRENT_USER_PLAYLISTS } from "../../../graphql/queries/playlist-queries";


export default function Playlists() {
    const { data, refetch } = useQuery(GET_CURRENT_USER_PLAYLISTS)
    console.log(data?.currentUserPlaylists)

    return (
        <MainLayout>
            <div className={style.header}>
                <MusicSwitchers />
                <Button text="+ create playlist" width="auto" />
            </div>
            <div className={style.list}>
                {data?.currentUserPlaylists.map((item, index) =>
                    <PlaylistCard
                        name={item.name}
                        authorId={item.authorId}
                        playlistId={item.id}
                        description={item.description}
                        key={index}
                    />)}
            </div>
        </MainLayout >)
}

