import UserCard from "./UserCard";
import style from '../../styles/common/UserList.module.scss'

interface IUserListProps {
    users: any[]
    smallCard?: boolean
    requestCard?: boolean
}

export default function UserList({ users, smallCard, requestCard }: IUserListProps) {

    return (<div className={style.userList}>
        {users?.map(item =>
            <UserCard role={item.role}
                avatar={item.userProfile?.avatar}
                name={item.userProfile?.name}
                styles={item.styles}
                userId={item.id}
                request={requestCard}
                status={item.userProfile?.status}
                small={smallCard}
            />)}
    </div>)
}