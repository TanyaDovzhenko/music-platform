import { gql } from '@apollo/client'

export const CREATE_PLAYLIST = gql`
mutation CreatePlaylist($createPlaylistInput: CreatePlaylistInput!){
    createPlaylist(createPlaylistInput: $createPlaylistInput){
    id
    authorId
    name
    image
    tracks{
      id
    }
  }
}
`