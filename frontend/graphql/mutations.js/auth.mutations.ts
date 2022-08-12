import { gql } from '@apollo/client'

export const SIGN_IN = gql`
 mutation SignIn($signInInput: SignInInput!){
    signin(signInInput: $signInInput){
        user{
        id
        userProfile{
        name
        }
    }
        access_token
    }
 }
`

export const SIGN_UP = gql`
 mutation SignUp($createUserInput: CreateUserInput!){
    signup(createUserInput: $createUserInput){
        user{
        id
        userProfile{
        name
        }
    }
        access_token
    }
 }
`