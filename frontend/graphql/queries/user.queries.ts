import { gql } from '@apollo/client'

export const GET_USERS = gql`
query Users{
  users {
      id
      email
      role
    }
}`

export const GET_USER = gql`
query User($id: Float!){
  user(id: $id) {
    id
    email
    role
  }
}`

export const GET_USER_PROFILE = gql`
query UserProfile{
  userProfile {
    id
    status
    avatar
    posts{
      id
      likes
      text
      title
    }
    musicStylePreferences{
      name
      id
    }
    playlists{
      name
      image
    }
  }
}`