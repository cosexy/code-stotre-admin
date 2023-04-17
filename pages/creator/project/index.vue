<template>
  <div>
    <includes-teleport to="#title">
      Create new product
    </includes-teleport>

    <div class="mx-auto max-w-4xl">
      <a-spin :spinning="mutationLoading">
        <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
          <a-form-item name="name">
            <input
              v-model="form.name"
              type="text"
              class="_name text-[22px]"
              placeholder="Product name"
            >
          </a-form-item>

          <div class="mt-7 flex">
            <a-form-item name="avatar">
              <editor-avatar v-model:value="form.avatar" v-model:image="imageForm" class="_avatar h-[160px] w-[266px] shrink-0 before:z-[3]" />
            </a-form-item>

            <a-form-item name="description" class="!ml-7 w-full">
              <textarea
                v-model="form.description"
                class="relative h-[160px] w-full rounded-md bg-gray-100 p-4 text-[15px] text-gray-500 focus:outline-0"
                placeholder="Post description"
              />
            </a-form-item>
          </div>

          <div class="flex">
            <div class="_avatar h-[160px] w-[266px] shrink-0 before:z-[3]">
              <a-form-item name="price" label="Price">
                <a-input-number class="!w-full" />
              </a-form-item>

              <a-form-item name="sale" label="Sale">
                <a-input-number class="!w-full" />
              </a-form-item>
            </div>

            <div class="!ml-7 w-full">
              <a-form-item name="category" label="Category">
                <creator-product-category v-model:value="form.category" />
              </a-form-item>

              <a-form-item name="tags" label="Tags">
                <creator-product-tags v-model:value="form.tags" />
              </a-form-item>
            </div>
          </div>

          <a-form-item name="content">
            <client-only>
              <lazy-editor-creator v-model:value="form.content" />
            </client-only>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CreateProductInput } from '~/apollo/__generated__/serverTypes'
import { ImageEntity } from '~/apollo/queries/__generated__/ImageEntity'

const form = ref<CreateProductInput>({
  avatar: '',
  category: '',
  content: '',
  description: '',
  name: '',
  price: 0,
  sale: 0,
  tags: []
})
const imageForm = ref<Pick<ImageEntity, 'id' | 'path'>>()

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
  ],
  content: [
    {
      required: true,
      message: 'Vui lòng nhập nội dung'
    }
  ],
  avatar: [
    {
      required: true,
      message: 'Vui lòng nhập ảnh đại diện'
    }
  ],
  price: [
    {
      required: true,
      message: 'Vui lòng nhập giá'
    }
  ],
  // optional sale, if sale > 0, then price = price - sale
  sale: [
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validator: (rule: any, value: any, callback: (error?: Error) => void) => {
        if (form.value.sale) {
          const discountedPrice = form.value.price - form.value.sale
          if (discountedPrice < 0) {
            callback(new Error('Discounted price cannot be negative'))
          } else {
            form.value.sale = discountedPrice
            callback()
          }
        } else {
          callback()
        }
      }
    }
  ],
  category: [
    {
      required: true,
      message: 'Vui lòng nhập danh mục'
    }
  ]
}))

const mutationLoading = useMutationLoading()
</script>

<style scoped>
._name {
    @apply w-full py-2.5 focus:outline-none border-b font-semibold pr-5 placeholder-gray-400 placeholder:font-normal
}
</style>
