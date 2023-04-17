<template>
  <a-select
    v-model:value="_value"
    mode="tags"
    show-search
    placeholder="Select or input search text"
    :options="categories"
    @search="handleSearch"
  />
</template>

<script lang="ts" setup>
import { DefaultOptionType } from 'ant-design-vue/lib/vc-select/Select'
import { Tags, TagsVariables } from '~/apollo/queries/__generated__/Tags'
import { GET_TAGS } from '~/apollo/queries/tags.query'

const props = defineProps<{
  value: string[]
}>()

// define emits fpr v-model:collapsed
const emit = defineEmits<{
  (event: 'update:value', value: string[]): void
}>()
const _value = useVModel(props, 'value', emit)

const categoriesVars = ref<TagsVariables>({
  filter: {
    name: '',
    limit: 10,
    offset: 0,
    sort: 'createdAt'
  }
})

const handleSearch = (val: string) => categoriesVars.value.filter.name = val

const { result } = useQuery<Tags, TagsVariables>(GET_TAGS, categoriesVars, {
  debounce: 500
})
const categories = computed<DefaultOptionType[]>(() => (result.value?.tags || []).map((category) => ({ label: category.name, value: category.name })) || [])
</script>

<style scoped></style>
