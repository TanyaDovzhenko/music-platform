import SwitchButton from "../common/SwitchButton";
import style from '../../styles/Music/Playlists.module.scss'

export default function MusicSwitchers() {
    return (
        <div className={style.musicSwitchers}>
            <SwitchButton href="/music/playlists" text="playlists" />
            <SwitchButton href="/music/musicians" text="musicians" />
            <SwitchButton href="/music/albums" text="albums" />
        </div >
    )
}