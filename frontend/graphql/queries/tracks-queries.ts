import { gql } from "@apollo/client";

export const GET_CURRENT_USER_LIKED_TRACKS = gql`
query CurrentUserLikedTracks{
  currentUserLikedTracks {
    id
    name
    image
    audio
    albumId
    userProfileId
    }
}`

export const GET_USER_LIKED_TRACKS = gql`
query UserLikedTracks($profileId: Int!){
  likedTracks(profileId: $profileId){
    id
    name
    image
    audio
    albumId
    userProfileId
  }
}`

export const CHECK_LIKED_TRACK = gql`
query CheckLikedTrack($trackId: Float!){
  checkLikedTrack(trackId: $trackId)
}`