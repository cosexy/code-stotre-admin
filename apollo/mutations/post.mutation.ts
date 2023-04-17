import { gql } from '#imports'

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            name
            content
            avatar {
                id
                path
            }
            description
            createdAt
            updatedAt
        }
    }
`

export const UPDATE_POST = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            id
            name
            description
            content
            avatar {
                id
                path
            }
        }
    }
`

export const REMOVE_POST = gql`
    mutation RemovePost($input: RemovePostInput!) {
        removePost(input: $input) {
            id
        }
    }
`
