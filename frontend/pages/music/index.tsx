import LikedTracks from "../../components/music/LikedTracks";
import MainLayout from "../../layouts/MainLayout";
import style from '../../styles/music/Music.module.scss'



export default function Music() {
    return (
        <MainLayout>
            <div className={style.tracks}>
                <LikedTracks />
            </div>
        </MainLayout >)
}