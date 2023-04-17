<template>
  <a-modal v-model:visible="visible" title="Modify Category" :confirm-loading="mutationLoading" @ok="submitForm">
    <a-spin :spinning="mutationLoading">
      <a-form ref="formRef" :model="form" layout="vertical" :rules="rules">
        <a-form-item label="Name" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea v-model:value="form.description" :auto-size="true" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script lang="ts" setup>
import { FormInstance } from 'ant-design-vue/lib/form'
import { CreateCategoryInput, UpdateCategoryInput } from '~/apollo/__generated__/serverTypes'
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '~/apollo/mutations/category.mutation'
import {
  CreateCategory,
  CreateCategory_createCategory,
  CreateCategoryVariables
} from '~/apollo/mutations/__generated__/CreateCategory'
import { NotifyEntity, NotifyType } from '~/entities/notify.entity'
import { UpdateCategory, UpdateCategoryVariables } from '~/apollo/mutations/__generated__/UpdateCategory'

const form = ref<Partial<UpdateCategoryInput>>({
  name: '',
  description: ''
})

const { onReceive, visible, toggleVisible } = useModal<UpdateCategoryInput>('categories')
onReceive((payload) => {
  if (payload) {
    form.value.id = payload.id
    form.value.name = payload.name
    form.value.description = payload.description
  } else {
    form.value = {
      name: '',
      description: ''
    }
  }
})

const rules = computed(() => ({
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên'
    }
  ],
  description: [
    {
      required: true,
      message: 'Vui lòng nhập mô tả'
    }
  ]
}))

const emits = defineEmits<{
  (event: 'created', payload: CreateCategory_createCategory): void
}>()

const { mutate: createCategory, onDone: onCreated } = useMutation<CreateCategory, CreateCategoryVariables>(CREATE_CATEGORY)
onCreated((payload) => {
  if (payload.data?.createCategory) {
    emits('created', payload.data.createCategory)
    toggleVisible()
  }
})

const { mutate: updateCategory, onDone: onUpdating } = useMutation<UpdateCategory, UpdateCategoryVariables>(UPDATE_CATEGORY)
onUpdating((payload) => {
  if (payload.data?.updateCategory) {
    toggleVisible()
  }
})

const mutationLoading = useMutationLoading()

const { fire } = useNotify<NotifyEntity>()
const formRef = ref<FormInstance>()
const submitForm = async () => {
  formRef.value?.validate().then(() => {
    try {
      if (!form.value.id) {
        createCategory({
          input: {
            name: form.value.name,
            description: form.value.description
          } as CreateCategoryInput
        })
      } else {
        updateCategory({
          input: {
            id: form.value.id,
            name: form.value.name,
            description: form.value.description
          } as UpdateCategoryInput
        })
      }
    } catch (e) {

    }
  }).catch(() => {
    fire({
      type: NotifyType.ERROR,
      message: 'Check your form'
    })
  })
}
</script>

<style scoped></style>
