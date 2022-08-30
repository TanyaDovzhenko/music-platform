import { gql } from "@apollo/client";

export const LIKE_ALBUM = gql`
mutation LikeTrack($albumId: Float!){
    likeAlbum(albumId: $albumId)
}`

export const UNLIKE_ALBUM = gql`
mutation UnlikeTrack($albumId: Float!){
    unlikeAlbum(albumId: $albumId)
}`