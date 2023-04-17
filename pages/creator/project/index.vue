<template>
  <div>
    <includes-teleport to="#title">
      Create new product
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-popconfirm
        v-if="isEdit"
        title="Are you sure delete this post?"
        ok-text="Yes"
        cancel-text="No"
      >
        <a-button type="danger" shape="round" :loading="mutationLoading">
          DELETE
        </a-button>
      </a-popconfirm>
      <a-button type="primary" shape="round" :loading="mutationLoading" class="ml-3" @click="publish">
        PUBLISH
      </a-button>
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
                <a-input-number v-model:value="form.price" class="!w-full" :min="0" />
              </a-form-item>

              <a-form-item name="sale" label="Sale">
                <a-input-number v-model:value="form.sale"  class="!w-full" />
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

<script lang="ts" setup async>
import { FormInstance } from 'ant-design-vue/lib/form'
import { CreateProductInput } from '~/apollo/__generated__/serverTypes'
import { ImageEntity } from '~/apollo/queries/__generated__/ImageEntity'
import { CREATE_PROJECT } from '~/apollo/mutations/project.mutation'
import { CreateProduct, CreateProductVariables } from '~/apollo/mutations/__generated__/CreateProduct'

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
    },
    {
      type: 'number',
      message: 'Vui lòng nhập giá là số'
    }
  ],
  // optional sale, if sale > 0, then price = price - sale
  sale: [
    {
      validator: () => {
        if (form.value.sale) {
          const discountedPrice = form.value.price - form.value.sale
          if (discountedPrice < 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('Discounted price cannot be negative');
          } else {
            return Promise.resolve()
          }
        } else {
          return Promise.resolve()
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

const formRef = ref<FormInstance>()
const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'products-id')

const { mutate: createProduct } = useMutation<CreateProduct, CreateProductVariables>(CREATE_PROJECT)

const publish = async () => {
  try {
    await formRef.value?.validate()
    if (!isEdit.value) {
      console.log(form.value)
      await createProduct({
        input: form.value
      })
      // await createPost({
      //   input: form.value
      // })
    } else {
      // const _currentPost = client.readQuery<Post, PostVariables>({
      //   query: GET_POST,
      //   variables: {
      //     filter: {
      //       slug: String(route.params.id)
      //     }
      //   }
      // })
      // if (_currentPost?.post) {
      //
      // }
    }
  } catch (e) {
    //
  }
}

const mutationLoading = useMutationLoading()
</script>

<style scoped>
._name {
    @apply w-full py-2.5 focus:outline-none border-b font-semibold pr-5 placeholder-gray-400 placeholder:font-normal
}
</style>
