import Link from 'next/link'
import { useEffect } from 'react'
import UserRole from '../profile/UserRole'
import FollowButton from './FollowButton'
import StylesPanel from '../music/StylesPanel'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries/user.queries'
import style from '../../styles/common/UserCard.module.scss'
import { UserRoles } from '../../types/user/userRoles.enum'
import { BASE_SERVER_URL } from '../../utilities/constants'

interface IUserCardProps {
    role?: UserRoles
    avatar?: string
    name?: string
    styles?: any
    userId: number
    request?: boolean
    status?: string
}

export default function UserCard({ role, name, styles, avatar,
    userId, status, request }: IUserCardProps) {

    const [getUser, { data }] = useLazyQuery(GET_USER, { variables: { id: userId } })
    const user = data?.user
    const userProfile = data?.user.userProfile

    useEffect(() => { if (request) getUser() }, [])

    return (<div
        className={style.userCard}
        style={{ backgroundImage: `url(${BASE_SERVER_URL + (avatar ?? userProfile?.avatar)})` }}>
        <div className={style.back}></div>
        <div
            className={style.avatar}
            style={{ backgroundImage: `url(${BASE_SERVER_URL + (avatar ?? userProfile?.avatar)})` }}>
        </div>
        <div className={style.info}>
            <div className={style.name}>
                <Link href={`/profile/${userId}`}>
                    <a>{(name ?? userProfile?.name)}</a>
                </Link>
            </div>
            <UserRole userRole={role ?? user?.role} size="small" />
            <StylesPanel styles={styles ?? user?.styles} />
            <span className={style.status}>{status ?? userProfile?.status}</span>
        </div>
        <div className={style.followBtn}>
            <FollowButton followedUserId={userId} />
        </div>
    </div>)
}