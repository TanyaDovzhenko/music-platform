import Link from 'next/link'
import Image from 'next/image'
import Logout from '../auth/Logout'
import style from '../../styles/common/Menu.module.scss'
import searchIcon from '../../images/icons/search.svg'
import peopleIcon from '../../images/icons/menu-item-people.svg'
import musicIcon from '../../images/icons/headphones-menu.svg'
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
                <Link href={'/music'}><a>my music</a></Link>
            </div>
            <div className={style.menuItem}>
                <Image src={peopleIcon} />
                <Link href={'/people'}><a>people</a></Link>
            </div>
            <div className={style.divider}></div>
            <div className={style.menuItem}>
                <Image src={searchIcon} width={18} height={18} />
                <Link href={'/search'}><a>search</a></Link>
            </div>
            <div className={style.menuItem} >
                <Logout />
            </div>
        </nav>
    )
}

export default Menu