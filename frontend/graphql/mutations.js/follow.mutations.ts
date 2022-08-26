import { gql } from "@apollo/client";

export const FOLLOW = gql`
mutation Follow($followedId: Int!){
    follow(followedId: $followedId)
}
`

export const UNFOLLOW = gql`
mutation Unfollow($followedId: Int!){
    unfollow(followedId: $followedId)
}
`