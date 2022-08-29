import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import Search from "../../../components/common/Serach"
import style from '../../../styles/search/Search.module.scss'
import SearchSwitchers from "../../../components/search/SearchSwitchers"
import TracksList from "../../../components/profile/tabs/TracksList"


export default function TracksPage() {
    const [tracks, setTracks] = useState<any[]>()
    return (
        <MainLayout>
            <div className={style.header}>
                <Search type="track" onDataRecieved={setTracks} />
                <SearchSwitchers />
            </div>
            <TracksList isCurrentUser={false} tracks={tracks ?? []} />
        </MainLayout>
    )
}