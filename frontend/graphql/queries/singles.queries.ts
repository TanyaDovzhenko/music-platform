import { gql } from '@apollo/client'

export const GET_USER_SINGLES = gql`
query UserSingles($userProfileId: Int!){
  userSingles(userProfileId: $userProfileId){
    id
    name
    image
    audio
  }
}`