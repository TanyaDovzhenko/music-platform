import Track from '../../music/Track';
import { useQuery } from '@apollo/client';
import TrackCreatingPanel from "./TrackCreatingPanel";
import style from '../../../styles/profile/Singles.module.scss'
import { GET_USER_SINGLES } from '../../../graphql/queries/profile-tracks.queries';
import { setActivePlaylist } from '../../../utilities/music/set-active-playlist';
import AbsenceMessage from '../../common/AbsenceMessage';

interface ISinglesProps {
    userProfileId: number
    isCurrentUser?: boolean
    musicianName: string
    userId: number
}

export default function Singles({ userProfileId, userId,
    isCurrentUser, musicianName }: ISinglesProps) {
    const { data: singles, refetch: refetchSingles, loading } = useQuery(GET_USER_SINGLES,
        { variables: { profileId: userProfileId } })

    const plylistId = Math.random() * Math.random()

    return (
        <div className={style.singles}>
            {isCurrentUser && <TrackCreatingPanel
                loading={loading}
                refetchTracks={refetchSingles} />}

            <div className={style.singleList}>
                {!singles?.singles.length &&
                    <AbsenceMessage message='tracks' />}

                {singles?.singles?.map((item, index) =>
                    <Track
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        audio={item.audio}
                        musicianName={musicianName}
                        userId={userId}
                        playlistId={plylistId}
                        setActivePlaylist={
                            (e) => setActivePlaylist(e, singles?.singles, plylistId)
                        }
                        key={index}
                    />)}
            </div >
        </div >)
}