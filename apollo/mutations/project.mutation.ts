import { gql } from '#imports'

export const CREATE_PROJECT = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            id
        }
    }
`
