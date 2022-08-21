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
    rate
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
    rate
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
