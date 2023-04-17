<template>
  <a-select
    v-model:value="_value"
    show-search
    placeholder="Select or input search text"
    allow-clear
    :options="categories"
    @search="handleSearch"
  />
</template>

<script lang="ts" setup>
import { DefaultOptionType } from 'ant-design-vue/lib/vc-select/Select'
import { CATEGORIES } from '~/apollo/queries/categories.query'
import { Categories, CategoriesVariables } from '~/apollo/queries/__generated__/Categories'

const props = defineProps<{
  value: string
}>()

// define emits fpr v-model:collapsed
const emit = defineEmits<{
  (event: 'update:value', value: boolean): void
}>()
const _value = useVModel(props, 'value', emit)

const categoriesVars = ref<CategoriesVariables>({
  filter: {
    name: '',
    limit: 10,
    offset: 0,
    sort: 'createdAt'
  }
})

const handleSearch = (val: string) => categoriesVars.value.filter.name = val

const { result } = useQuery<Categories, CategoriesVariables>(CATEGORIES, categoriesVars, {
  debounce: 500
})
const categories = computed<DefaultOptionType[]>(() => (result.value?.categories || []).map((category) => ({ label: category.name, value: category.id })) || [])
</script>

<style scoped></style>
