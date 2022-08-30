import { gql } from '@apollo/client'

export const GET_USER_ALBUMS = gql`
query UserAlbums($profileId: Int!){
  userAlbums(profileId: $profileId){
    id
    authorUserProfileId
    authorName
    authorUserId
    name
    description
    image
    tracks{
      id
    }
  }
}`

export const GET_ALBUM = gql`
query GetAlbum($id: Int!){
  album(id: $id){
    id
    authorUserProfileId
    authorName
    authorUserId
    name
    description
    image
    tracks{
      id
      name
      audio
      image
      userProfileId
    }
  }
}`

export const GET_CURRENT_USER_LIKED_ALBUM = gql`
query CurrentUserLikedAlbums{
  currentUserLikedAlbums{
    id
    authorUserProfileId
    authorName
    authorUserId
    name
    description
    image
  }
}`


export const CHECK_LIKED_ALBUM = gql`
query CheckLikedAlbum($albumId: Float!){
  checkLikedAlbum(albumId: $albumId)
}`