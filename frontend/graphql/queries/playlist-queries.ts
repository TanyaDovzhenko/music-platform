import { gql } from '@apollo/client'

export const GET_USER_PLAYLISTS = gql`
query UserPlaylists($profileId: Int!){
  userPlaylists(profileId: $profileId) {
    id
    name
    description
    authorId
    isDefault
  }
}`

export const GET_CURRENT_USER_PLAYLISTS = gql`
query CurrentUserPlaylists{
  currentUserPlaylists {
    id
    name
    description
    authorId
    isDefault
  }
}`


export const GET_PLAYLIST = gql`
query Playlist($id: Int!){
  playlist(id: $id) {
    id
    name
    description
    tracks{
    id
    name
    image
    audio
    albumId
    userProfileId
      userProfile{
      name
      userId
      }
    }
  }
}`
