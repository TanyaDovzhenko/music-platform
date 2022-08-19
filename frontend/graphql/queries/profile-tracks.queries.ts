import { gql } from '@apollo/client'

export const GET_USER_SINGLES = gql`
query UserSinglesTracks($profileId: Int!){
  singlesTracks(profileId: $profileId){
    id
    name
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


// export const GET_FIRST_IMP_TRACKS = gql`
// query UserFirstImpTracks{
//   firstImpTracks{
//     id
//     tracks{
//       id
//       name
//       audio
//       image
//       rate
//       userProfileId
//     }
//   }
// }
// }`