<template>
  <a-table :columns="columns" :data-source="data" :pagination="pagination">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ $dayjs(record.createdAt).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'updatedAt'">
        {{ $dayjs(record.updatedAt).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <span>
          <a-popconfirm
            title="Are you sure delete this category?"
            ok-text="Yes"
            cancel-text="No"
            :disabled="loading"
            @confirm="removeCategory(record)"
          >
            <a-button type="danger" shape="round" size="small">Remove</a-button>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-button type="primary" shape="round" size="small" @click="toggle(record)">Edit</a-button>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { ColumnsType, TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import { Categories_categories } from '~/apollo/queries/__generated__/Categories'
import { REMOVE_CATEGORY } from '~/apollo/mutations/category.mutation'
import { RemoveCategory, RemoveCategoryVariables } from '~/apollo/mutations/__generated__/RemoveCategory'
import { CreateCategoryInput } from '~/apollo/__generated__/serverTypes'

const columns = computed<ColumnsType<Categories_categories>>(() => [
  {
    title: 'Name',
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt'
  },
  {
    title: 'Updated At',
    key: 'updatedAt',
    dataIndex: 'updatedAt'
  },
  {
    title: 'Action',
    key: 'action',
    align: 'right',
    width: 200
  }
])
defineProps<{
    data: Categories_categories[]
    pagination: TablePaginationConfig
}>()

const $dayjs = useDayjs()

const { toggle } = useModal<CreateCategoryInput>('categories')

const { loading, mutate, onDone: onDeleted } = useMutation<RemoveCategory, RemoveCategoryVariables>(REMOVE_CATEGORY)

const removeCategory = (category: Categories_categories) => mutate({
  input: {
    id: category.id
  }
})

const emits = defineEmits<{
    (event: 'removed', payload: Pick<Categories_categories, 'id'>): void
}>()

const { client } = useApolloClient()
onDeleted((payload) => {
  if (payload.data?.removeCategory) {
    client.cache.evict({ id: `Category:${payload.data.removeCategory.id}` })

    emits('removed', payload.data.removeCategory)
  }
})
</script>
