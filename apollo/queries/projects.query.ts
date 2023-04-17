import { gql } from '#imports'

export const PRODUCTS = gql`
    query Products($filter: GetProductsFilter!) {
        products(filter: $filter) {
            id
            slug
            avatar {
                id
                path
            }
            user {
                id
                name
            }
            name
            sale
            price
            description
            category {
                id
                name
            }
            tags {
                id
                name
            }
            createdAt
        }
    }
`

export const PRODUCTS_COUNT = gql`
    query ProductsCount($filter: GetCountProductsFilter!) {
        productsCount(filter: $filter)
    }
`
