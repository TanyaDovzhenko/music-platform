import { gql } from "@apollo/client";

export const CHECK_FOLLOWING = gql`
query CheckFollowing($followedId: Int!){
    checkFollowing(followedId: $followedId)
}
`

export const USER_FOLLOWERS = gql`
  query UserFollowers($followedId: Int!){
    userFollowers(followedId: $followedId){
        followedId
        followerId
    }
  }
`

export const USER_FOLLOWED = gql`
  query UserFollowed($followerId: Int!){
    userFollowed(followerId: $followerId){
        followedId
        followerId
    }
  }
`