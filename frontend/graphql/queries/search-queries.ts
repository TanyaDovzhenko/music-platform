import { gql } from '@apollo/client'

export const GET_USERS_BY_ROLE = gql`
query UsersByRole($userRole: UserRoles!){
    usersByRole(userRole: $userRole) {
      id
      email
      role
      styles{
      id 
      name
    }
    userProfile{
      name
      avatar
      status
    }
  }
}`

export const GET_USERS_BY_PARAMS = gql`
query UsersByParams($userName: String!, $userRole: UserRoles){
  usersByParams(userName: $userName, userRole: $userRole) {
      id
      email
      role
      styles{
      id 
      name
    }
    userProfile{
      name
      avatar
      status
    }
  }
}`

export const GET_TRACKS_BY_PARAMS = gql`
query TracksByParams($trackName: String!){
  tracksByParams(trackName: $trackName) {
      id
      name
      audio
      image
      rate
      userProfileId
      userProfile{
      name
      userId
      }
  }
}`

export const GET_ALBUMS_BY_PARAMS = gql`
query AlbumsByParams($albumName: String!){
  albumsByParams(albumName: $albumName) {
    id
    authorUserProfileId
    authorName
    authorUserId
    name
    description
    image
    rate
    styles{
      id 
      name
    }
    tracks{
      id
      name
      audio
      image
      rate
      userProfileId
    }
  }
}`