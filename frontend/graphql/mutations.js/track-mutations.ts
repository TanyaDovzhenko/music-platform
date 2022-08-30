import { gql } from "@apollo/client";

export const LIKE_TRACK = gql`
mutation LikeTrack($trackId: Float!){
    likeTrack(trackId: $trackId)
}`

export const UNLIKE_TRACK = gql`
mutation UnlikeTrack($trackId: Float!){
    unlikeTrack(trackId: $trackId)
}`