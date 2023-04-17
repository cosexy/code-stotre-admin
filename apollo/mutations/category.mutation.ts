import { gql } from '#imports'

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) {
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`

export const REMOVE_CATEGORY = gql`
    mutation RemoveCategory($input: RemoveCategoryInput!) {
        removeCategory(input: $input) {
            id
        }
    }
`
