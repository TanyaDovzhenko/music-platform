import { useQuery } from "@apollo/client"
import { NextPageContext } from "next"
import BackButton from "../../../components/common/BackButton"
import Track from "../../../components/music/Track"
import { GET_PLAYLIST } from "../../../graphql/queries/playlist-queries"
import MainLayout from "../../../layouts/MainLayout"
import style from '../../../styles/Music/Playlist.module.scss'
import { BASE_SERVER_URL } from "../../../utilities/constants"
import PlayerState from "../../../store/PlayerState"
import { observer } from "mobx-react-lite"
import heartIcon from '../../../images/icons/heart-icon.svg'
import Image from "next/image"
import { useEffect } from "react"


function Playlist({ id }: any) {
    const { data, refetch } = useQuery(GET_PLAYLIST, { variables: { id } })
    const playlist = data?.playlist

    const setActivePlaylist = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (PlayerState.activePlaylist?.id === playlist.id) return
        else PlayerState.setActivePlaylist({
            id: playlist.id, tracks: data?.playlist?.tracks
        })
    }

    useEffect(() => {
        refetch({ id })
    }, [])

    return (
        <MainLayout>
            <BackButton text='to playlists' margin={true} />
            <div className={style.container}>
                <div className={style.header}
                    style={{ backgroundImage: `url(${BASE_SERVER_URL + playlist?.image})` }}>
                    <div className={style.headerInfo}>
                        <div className={style.title}>{playlist?.name}</div>
                        <div className={style.descr}>{playlist?.description}</div>
                        <div className={style.author}>by: author</div>
                        <div className={style.tracksNumber}>tracks: {playlist?.tracks?.length}</div>
                    </div>
                </div>
                <div className={style.tracks}>
                    {playlist?.tracks?.length ?
                        playlist.tracks.map((item, index) =>
                            <Track
                                id={item.id}
                                name={item.name}
                                audio={item.audio}
                                musician={'musician'}
                                image={item.image}
                                playlistId={playlist.id}
                                setActivePlaylist={setActivePlaylist}
                                key={index}
                            />)
                        : <div>ADD TRACK</div>}
                </div>
            </div>
        </MainLayout >)
}

export default observer(Playlist)

export async function getServerSideProps(ctx: NextPageContext) {
    return { props: { id: Number(ctx.query.playlistId) } }
}

