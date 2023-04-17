import { gql } from '#imports'

export const GET_TAGS = gql`
    query Tags($filter: GetCategoriesFilter!) {
        tags(filter: $filter) {
            id
            name
        }
    }
`
