import SwitchButton from "../common/SwitchButton";
import style from '../../styles/Music/Playlists.module.scss'

export default function PeopleSwitchers() {
    return (
        <div className={style.musicSwitchers}>
            <SwitchButton href="/people/followed" text="I follow" />
            <SwitchButton href="/people/followers" text="my followers" />
        </div >
    )
}