import Track from '../../music/Track';
import { useQuery } from '@apollo/client';
import style from '../../../styles/profile/Singles.module.scss'
import TrackCreatingPanel from "./TrackCreatingPanel";
import { GET_USER_SINGLES } from '../../../graphql/queries/profile-tracks.queries';
import { setActivePlaylist } from '../../../utilities/music/set-active-playlist';


interface ISinglesProps {
    userProfileId: number
    currentUser?: boolean
}

export default function Singles({ userProfileId, currentUser }: ISinglesProps) {
    const { data: singlesTracks, refetch: refetchSingles, loading } = useQuery(GET_USER_SINGLES,
        { variables: { profileId: userProfileId } })

    return (
        <div className={style.singles}>
            {currentUser && <TrackCreatingPanel
                loading={loading}
                refetchSingles={refetchSingles} />}

            <div className={style.singleList}>
                {!singlesTracks?.singlesTracks?.tracks.length &&
                    <div className={style.noTracksMessage}>no tracks yet </div>}

                {singlesTracks?.singlesTracks?.tracks?.map((item, index) =>
                    <Track
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        audio={item.audio}
                        musician={''}
                        playlistId={singlesTracks?.singlesTracks?.id}
                        setActivePlaylist={(e) => setActivePlaylist(e, singlesTracks)}
                        key={index}
                    />)}
            </div >
        </div >)
}