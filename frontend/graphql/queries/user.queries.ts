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

export const GET_CURRENT_USER = gql`
query CurrentUser{
  currentUser {
    id
    email
    role
  }
}`

export const GET_USER_PROFILE = gql`
query UserProfile($id: Int!){
  userProfile(id: $id) {
    id
    name
    avatar
    status
  }
}`

export const GET_PROFILE_BY_USER_ID = gql`
query ProfileByUserID($userId: Int!){
  userProfileByUserId(userId: $userId) {
    id
    name
    avatar
    status
  }
}`

export const GET_CURRENT_USER_PROFILE = gql`
query CurrentUserProfile{
  currentUserProfile{
    id
    name
    avatar
    status
  }
}`

