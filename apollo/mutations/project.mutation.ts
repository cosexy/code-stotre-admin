import { gql } from '#imports'

export const CREATE_PROJECT = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            id
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            id
            avatar {
                id
                path
            }
            name
            sale
            price
            description
            content
            category {
                id
                name
            }
            tags {
                id
                name
            }
        }
    }
`
