import SwitchButton from "../common/SwitchButton";
import style from '../../styles/Music/Switchers.module.scss'

export default function PeopleSwitchers() {
    return (
        <div className={style.switchers}>
            <SwitchButton href="/people/followed" text="I follow" />
            <SwitchButton href="/people/followers" text="my followers" />
        </div >
    )
}