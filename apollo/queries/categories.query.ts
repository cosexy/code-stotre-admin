import { gql } from '#imports'

export const COUNT_CATEGORIES = gql`
    query CountCategories($filter: GetCountCategoriesFilter!) {
        categoriesCount(filter: $filter)
    }
`

export const CATEGORIES = gql`
    query Categories($filter: GetCategoriesFilter!) {
        categories(filter: $filter) {
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`
