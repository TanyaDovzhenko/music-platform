import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import style from '../../../styles/profile/Singles.module.scss'
import { GET_USER_SINGLES } from "../../../graphql/queries/singles.queries";
import Track from "../../music/Track";
import { NextPageContext } from "next";
import CreateClient from "../../../graphql/apollo-client";
import { GET_USER_PROFILE } from "../../../graphql/queries/user.queries";

interface ISinglesListProps {
    userProfileId: number
}

export default function SinglesList({ userProfileId }: ISinglesListProps) {
    const { data: userProfile } = useQuery(GET_USER_PROFILE)
    const [getSingles, { data }] = useLazyQuery(GET_USER_SINGLES);



    useEffect(() => { getSingles({ variables: { userProfileId } }) }, [])
    return (
        <div className={style.list}>
            {/* {data?.userSingles?.map(item =>
                <Track
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    audio={item.audio}
                    musician={userProfile?.userProfile?.name}
                    playlistId={1}
                    setActivePlaylist={() => { }}
                />)} */}
        </div >)
}