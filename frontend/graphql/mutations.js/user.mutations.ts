import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
mutation UpdateProfile($updateUserProfileInput: UpdateUserProfileInput!){
    updateUserProfile(updateUserProfileInput: $updateUserProfileInput){
        id
        name
        avatar
        status
    }
}
`