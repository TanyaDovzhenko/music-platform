import { useEffect } from 'react';
import Track from '../../music/Track';
import AbsenceMessage from '../../common/AbsenceMessage';
import { useLazyQuery } from '@apollo/client';
import TrackCreatingPanel from "./TrackCreatingPanel";
import style from '../../../styles/profile/Singles.module.scss'
import { GET_USER_SINGLES } from '../../../graphql/queries/profile-tracks.queries';
import { setActivePlaylist } from '../../../utilities/music/set-active-playlist';



interface ISinglesProps {
    userProfileId?: number
    isCurrentUser?: boolean
    musicianName?: string
    userId?: number
    tracks?: any[]
}

export default function TracksList({ userProfileId, userId,
    isCurrentUser, tracks }: ISinglesProps) {
    const [getSingles, { data: singles, refetch: refetchSingles, loading }] =
        useLazyQuery(GET_USER_SINGLES,
            { variables: { profileId: userProfileId } })

    const playlistId = Math.random() * Math.random()

    useEffect(() => { if (!tracks) getSingles() }, [])
    return (
        <div className={style.singles}>
            {isCurrentUser && <TrackCreatingPanel
                loading={loading}
                refetchTracks={refetchSingles} />}

            <div className={style.singleList}>
                {(!singles?.singles.length && !tracks?.length) &&
                    <AbsenceMessage message='no tracks' />}

                {singles?.singles?.map((item, index) =>
                    <Track
                        key={index}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        audio={item.audio}
                        musicianName={item.userProfile.name}
                        userId={userId}
                        playlistId={playlistId}
                        setActivePlaylist={
                            (e) => setActivePlaylist(e, singles?.singles, playlistId)
                        }
                    />)}
                {tracks?.map((item, index) =>
                    <Track
                        key={index}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        audio={item.audio}
                        musicianName={item.userProfile.name}
                        userId={item.userProfile.userId}
                        playlistId={playlistId}
                        setActivePlaylist={
                            (e) => setActivePlaylist(e, tracks, playlistId)
                        }
                    />)}
            </div >
        </div >)
}