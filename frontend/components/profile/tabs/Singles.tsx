import style from '../../../styles/profile/Singles.module.scss'
import TrackCreatingPanel from "./TrackCreatingPanel";
import SinglesList from "./SinglesList";

interface ISinglesProps {
    userProfileId: number
}

export default function Singles({ userProfileId }: ISinglesProps) {
    return (
        <div className={style.singles}>
            <TrackCreatingPanel userProfileId={userProfileId} />
            <div>SEARCH TRACKSSSSSS</div>
            <SinglesList userProfileId={userProfileId} />
        </div >)
}