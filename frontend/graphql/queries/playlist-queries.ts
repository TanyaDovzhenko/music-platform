import { gql } from '@apollo/client'

export const GET_USER_PLAYLISTS = gql`
query Playlists{
  userProfile{
    playlists{
      name
      image
    }
  }
}`


export const GET_PLAYLIST = gql`
query Playlist($id: Int!){
  playlist(id: $id) {
    id
    name
    image
    description
    likes
    tracks{
    id
    name
    image
    audio
    albumId
    comments{
      text
    }
    musicStyles{
      name
    }
    }
  }
}`
