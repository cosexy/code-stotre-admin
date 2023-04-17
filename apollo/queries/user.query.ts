import { gql } from '#imports'

export const GET_ME = gql`
    query Me {
        me {
            id
            name
            email
            role
            avatar
        }
    }
`
