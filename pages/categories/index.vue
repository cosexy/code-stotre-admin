<template>
  <div>
    <includes-teleport to="#title">
      Categories <span>({{ count }})</span>
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-button type="primary" shape="round" @click="modal.toggle('categories')">
        Add New
      </a-button>
    </includes-teleport>

    <client-only>
      <categories-table :data="categories" :pagination="pagination" @removed="onRemoved()" />
    </client-only>

    <client-only>
      <categories-form @created="onCreated($event)" />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import { CATEGORIES, COUNT_CATEGORIES } from '~/apollo/queries/categories.query'
import { CountCategories, CountCategoriesVariables } from '~/apollo/queries/__generated__/CountCategories'
import { Categories, Categories_categories, CategoriesVariables } from '~/apollo/queries/__generated__/Categories'
import { CreateCategory_createCategory } from '~/apollo/mutations/__generated__/CreateCategory'

const filter = reactive<CategoriesVariables>({
  filter: {
    name: '',
    limit: 9,
    offset: 0,
    sort: 'createdAt'
  }
})

const countFilter = computed<CountCategoriesVariables>(() => {
  return {
    filter: {
      name: filter.filter.name
    }
  }
})

const { result, refetch: reFetchCountCategories } = useQuery<CountCategories, CountCategoriesVariables>(COUNT_CATEGORIES, countFilter)
const count = computed<number>(() => result.value?.categoriesCount || 0)

const { result: categoriesResult, refetch: reFetchCategories } = useQuery<Categories, CategoriesVariables>(CATEGORIES, filter, {
  fetchPolicy: 'network-only'
})
const categories = computed<Categories_categories[]>(() => categoriesResult.value?.categories || [])

const pagination = computed<TablePaginationConfig>(() => ({
  pageSize: 9,
  total: count.value,
  onChange: (page: number) => {
    filter.filter.offset = (page - 1) * 9
    reFetchCategories()
  }
}))

const modal = useModal('categories')

const onCreated = (_: CreateCategory_createCategory) => {
  reFetchCategories()
  reFetchCountCategories()
}

const onRemoved = () => {
  reFetchCategories()
  reFetchCountCategories()
}
</script>

<style scoped></style>
