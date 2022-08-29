import { useQuery } from '@apollo/client';
import UserCard from '../../common/UserCard';
import AbsenceMessage from '../../common/AbsenceMessage';
import { USER_FOLLOWED } from '../../../graphql/queries/follow.queries';
import style from '../../../styles/common/UserList.module.scss';
import { useEffect } from 'react';


export default function Followings({ userId }: any) {
    const { data, refetch } = useQuery(USER_FOLLOWED,
        { variables: { followerId: userId } })

    useEffect(() => { refetch() }, [])
    return (<div >
        <div className={style.userList}>
            {data?.userFollowed.map(item =>
                <UserCard userId={item.followedId} request={true} small={true} />)}
        </div>
        {!data?.userFollowed.length && <AbsenceMessage message='no followed' />}
    </div>)
}