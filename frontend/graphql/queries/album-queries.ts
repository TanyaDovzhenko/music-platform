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
      albumId
      audio
      image
      name
      userProfileId
      rate
    }
  }
}`
