import { gql } from '@apollo/client'

export const GET_USER_SINGLES = gql`
query UserSingles($profileId: Int!){
  singles(profileId: $profileId){
      id
      name
      audio
      image
      userProfileId
      userProfile{
      name
      userId
      }
  }
}`