<template>
  <div>
    <includes-teleport to="#title">
      My Products ({{ count }})
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-button type="primary" shape="round" @click="$router.push('/creator/project')">
        Add New
      </a-button>
    </includes-teleport>

    <products-search v-model:value="vars.filter" />

    <client-only>
      <products-list :products="products" class="mt-6" />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { Products, ProductsVariables } from '~/apollo/queries/__generated__/Products'
import { PRODUCTS, PRODUCTS_COUNT } from '~/apollo/queries/projects.query'
import { ProductsCount, ProductsCountVariables } from '~/apollo/queries/__generated__/ProductsCount'

const vars = reactive<ProductsVariables>({
  filter: {
    category: '',
    limit: 10,
    name: '',
    offset: 0,
    sort: 'createdAt',
    tags: []
  }
})

const { result } = useQuery<Products, ProductsVariables>(PRODUCTS, vars, { debounce: 300 })
const products = computed(() => result.value?.products || [])

const countFilter = computed<ProductsCountVariables>(() => ({
  filter: {
    category: vars.filter.category,
    tags: vars.filter.tags,
    name: vars.filter.name
  }
}))
const { result: countResult } = useQuery<ProductsCount, ProductsCountVariables>(PRODUCTS_COUNT, countFilter, { debounce: 300 })
const count = computed(() => countResult.value?.productsCount || 0)
</script>

<style scoped></style>
