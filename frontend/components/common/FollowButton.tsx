import cn from 'classnames'
import { useMutation, useQuery } from '@apollo/client'
import style from '../../styles/common/Button.module.scss'
import { CHECK_FOLLOWING } from '../../graphql/queries/follow.queries'
import { FOLLOW, UNFOLLOW } from '../../graphql/mutations.js/follow.mutations'

interface IUserCardProps {
    followedUserId: number
}

export default function FollowButton({ followedUserId }: IUserCardProps) {
    const { data, refetch, loading } = useQuery(CHECK_FOLLOWING,
        { variables: { followedId: followedUserId } })

    const [follow, { data: followed }] = useMutation(FOLLOW,
        { variables: { followedId: followedUserId } })
    const [unfollow, { data: unfollowed }] = useMutation(UNFOLLOW,
        { variables: { followedId: followedUserId } })

    const manageFollow = async () => {
        if (data?.checkFollowing) await unfollow()
        else if (!data?.checkFollowing) await follow()
        await refetch()
    }

    return (<button
        onClick={manageFollow}
        className={cn(style.button, style.auto, style.followBtn)}
        disabled={loading}>
        {data?.checkFollowing ? "unfollow" : "follow"}
    </button>)
}