import { gql } from '@apollo/client'

export const GET_ALL_STYLES = gql`
query AllStyles{
    styles{
        id
        name
    }
}`
