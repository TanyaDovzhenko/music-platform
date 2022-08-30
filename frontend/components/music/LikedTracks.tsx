import {
    GET_CURRENT_USER_LIKED_TRACKS,
    GET_USER_LIKED_TRACKS
} from "../../graphql/queries/tracks-queries";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import Track from "../../components/music/Track";
import AbsenceMessage from "../common/AbsenceMessage";
import { setActivePlaylist } from "../../utilities/music/set-active-playlist";

interface ILikedTracksProps {
    userProfileId?: number
}

export default function LikedTracks({ userProfileId }: ILikedTracksProps,) {
    const [getCurrentUserLikedTracks,
        { data: currentUserTracks, refetch: refetchCurrentUserTracks }] =
        useLazyQuery(GET_CURRENT_USER_LIKED_TRACKS)

    const [getUserLikedTracks,
        { data: userTracks, refetch: refetchUserTracks }] =
        useLazyQuery(GET_USER_LIKED_TRACKS,
            { variables: { profileId: userProfileId } })

    const playlistId = Math.random() * Math.random()

    useEffect(() => {
        if (!userProfileId) refetchCurrentUserTracks()
        else if (userProfileId) refetchUserTracks()
    })
    return (
        <>
            {currentUserTracks?.currentUserLikedTracks.map(item =>
                <Track
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    audio={item.audio}
                    musicianName={item.name}
                    userId={item.userId}
                    playlistId={playlistId}
                    setActivePlaylist={(e) =>
                        setActivePlaylist(e, currentUserTracks?.currentUserLikedTracks, playlistId)
                    }
                />)}
            {userTracks?.likedTracks.map(item =>
                <Track
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    audio={item.audio}
                    musicianName={item.name}
                    userId={item.userId}
                    playlistId={playlistId}
                    setActivePlaylist={(e) =>
                        setActivePlaylist(e, userTracks?.likedTracks, playlistId)
                    }
                />)}
            {(!currentUserTracks?.currentUserLikedTracks.length && !userTracks?.likedTracks.length)
                && <AbsenceMessage message="no tracks" />}
        </>)
}
