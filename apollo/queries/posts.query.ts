import { gql } from '#imports'

export const GET_POSTS = gql`
    query Posts($filter: PostsFilter!) {
        posts(filter: $filter) {
            id
            name
            slug
            description
            avatar {
                id
                path
            }
            user {
                id
                name
            }
            createdAt
        }
    }
`

export const GET_POST = gql`
    query Post($filter: PostFilter!) {
        post(filter: $filter) {
            id
            name
            description
            avatar {
                id
                path
            }
            content
        }
    }
`
