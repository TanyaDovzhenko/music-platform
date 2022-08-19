import cn from 'classnames'
import style from '../../styles/profile/Tabs.module.scss'
import { ListenerTabsObj, MusicianTabsObj } from '../../types/profile/profile-tabs'
import { UserRoles } from '../../types/user/userRoles.enum'

interface ITabsProps {
    userRole: string
    onClick: (arg: string) => void,
    activeTab: string
}

export default function ProfileTabs({ userRole, onClick, activeTab }: ITabsProps) {

    return (
        <div>
            {userRole == (UserRoles.LISTENER).toUpperCase() ?
                <>{ListenerTabsObj.map((item, index) =>
                    <span
                        className={cn(style.tab, { [style.active]: activeTab == item.name })}
                        onClick={() => onClick(item.name)}
                        key={index} >
                        {item.name}
                    </span>)}
                </>
                : userRole == (UserRoles.MUSICIAN).toUpperCase() ?
                    <>{MusicianTabsObj.map((item, index) =>
                        <span
                            className={cn(style.tab, { [style.active]: activeTab == item.name })}
                            onClick={() => onClick(item.name)}
                            key={index} >
                            {item.name}
                        </span>)}
                    </>
                    : <></>}
        </div>
    )
}