import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/common/Menu.module.scss'
import peopleIcon from '../../images/icons/menu-item-people.svg'
import settingsIcon from '../../images/icons/menu-item-settings.svg'
import suggestionsIcon from '../../images/icons/menu-item-suggestions.svg'
import musicIcon from '../../images/icons/headphones-menu.svg'
import penIcon from '../../images/icons/menu-item-reviews.svg'
import profileIcon from '../../images/icons/menu-item-profile.svg'


function Menu() {
    return (
        <nav className={style.menu}>
            <div className={style.menuItem} >
                <Image src={profileIcon} />
                <Link href={'/profile'}><a>my profile</a></Link>
            </div>
            <div className={style.menuItem}>
                <Image src={musicIcon} />
                <Link href={'/music/playlists'}><a>my music</a></Link>
            </div>
            <div className={style.menuItem}>
                <Image src={suggestionsIcon} />
                <Link href={'/suggestions'}><a>suggestions</a></Link>
            </div>
            <div className={style.menuItem}>
                <Image src={peopleIcon} />
                <Link href={'/people'}><a>people</a></Link>
            </div>
            <div className={style.menuItem} >
                <Image src={penIcon} />
                <Link href={'/reviews'}><a>reviews</a></Link>
            </div>
            <div className={style.divider}></div>
            <div className={style.menuItem} >
                <Image src={settingsIcon} />
                <Link href={'/settings'}><a>settings</a></Link>
            </div>
        </nav>
    )
}

export default Menu