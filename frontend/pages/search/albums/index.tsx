import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import Search from "../../../components/common/Serach"
import Albums from "../../../components/profile/tabs/Albums"
import SearchSwitchers from "../../../components/search/SearchSwitchers"
import style from '../../../styles/search/Search.module.scss'


export default function AlbumsPage() {
    const [albums, setAlbums] = useState<any[]>()
    return (
        <MainLayout>
            <div className={style.header}>
                <Search type="album" onDataRecieved={setAlbums} />
                <SearchSwitchers />
            </div>
            <Albums albums={albums ?? []} />
        </MainLayout>
    )
}