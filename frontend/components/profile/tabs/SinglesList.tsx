import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import style from '../../../styles/profile/Singles.module.scss'
import { GET_USER_SINGLES } from "../../../graphql/queries/profile-tracks.queries";
import Track from "../../music/Track";
import { GET_USER_PROFILE } from "../../../graphql/queries/user.queries";
import PlayerState from "../../../store/PlayerState";

interface ISinglesListProps {
    userProfileId: number
}

export default function SinglesList({ userProfileId }: ISinglesListProps) {
    const { data: userProfile } = useQuery(GET_USER_PROFILE)
    const [getSingles, { data: singlesTracks }] = useLazyQuery(GET_USER_SINGLES);

    const setActivePlaylist = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (PlayerState.activePlaylist?.id === singlesTracks?.singlesTracks?.id) return
        else PlayerState.setActivePlaylist({
            id: singlesTracks?.singlesTracks?.id,
            tracks: singlesTracks?.singlesTracks?.tracks
        })
    }

    useEffect(() => { getSingles({ variables: { userProfileId } }) }, [])

    return (
        <div className={style.list}>
            {singlesTracks?.singlesTracks?.tracks?.map(item =>
                <Track
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    audio={item.audio}
                    musician={userProfile?.userProfile?.name}
                    playlistId={singlesTracks?.singlesTracks?.id}
                    setActivePlaylist={setActivePlaylist}
                />)}
        </div >)
}