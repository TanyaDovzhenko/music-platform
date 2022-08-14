import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import style from '../../../styles/profile/Singles.module.scss'
import { GET_USER_SINGLES } from "../../../graphql/queries/singles.queries";
import TrackCreatingPanel from "./TrackCreatingPanel";
import SinglesList from "./SinglesList";

interface ISinglesProps {
    userProfileId: number
}

export default function Singles({ userProfileId }: ISinglesProps) {
    return (
        <div className={style.singles}>
            <TrackCreatingPanel userProfileId={userProfileId} />
            <SinglesList userProfileId={userProfileId} />
        </div >)
}