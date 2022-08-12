import style from '../../styles/profile/Tabs.module.scss'
import { ListenerTabsObj, MusicianTabsObj } from '../../types/profile/profile-tabs'
import { UserRoles } from '../../types/user/userRoles.enum'

interface ITabsProps {
    userRole: string
    onClick: any
}

export default function ProfileTabs({ userRole, onClick }: ITabsProps) {


    return (
        <div>
            {userRole == UserRoles.LISTENER ?
                <>{ListenerTabsObj.map(item =>
                    <span onClick={() => onClick(item.name)} className={style.tab} >
                        {item.name}
                    </span>)}</>
                : userRole == UserRoles.MUSICIAN ?
                    <>{MusicianTabsObj.map(item =>
                        <span onClick={() => onClick(item.name)} className={style.tab} >
                            {item.name}
                        </span>)}</> : <></>}
        </div>
    )
}