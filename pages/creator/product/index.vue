<template>
  <div>
    <includes-teleport to="#title">
      {{ isEdit ? 'Edit product' : 'Create product' }}
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-popconfirm
        v-if="isEdit"
        title="Are you sure delete this product?"
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
                <a-input-number v-model:value="form.sale" class="!w-full" />
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
import { CREATE_PROJECT, UPDATE_PRODUCT } from '~/apollo/mutations/project.mutation'
import { CreateProduct, CreateProductVariables } from '~/apollo/mutations/__generated__/CreateProduct'
import { Product, Product_product, ProductVariables } from '~/apollo/queries/__generated__/Product'
import { PRODUCT } from '~/apollo/queries/projects.query'
import { UpdateProduct, UpdateProductVariables } from '~/apollo/mutations/__generated__/UpdateProduct'

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
            return Promise.reject('Discounted price cannot be negative')
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
const { client } = useApolloClient()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = useRouter()
const isEdit = computed(() => route.name === 'creator-product-id')

if (isEdit.value) {
  const { data } = await useAsyncQuery<Product>(PRODUCT, {
    filter: {
      slug: String(route.params.id)
    }
  })

  const _raw = data.value?.product

  if (_raw) {
    const _form: Partial<Product_product> = JSON.parse(JSON.stringify(_raw))
    delete _form.__typename
    delete _form.id

    // @ts-ignore
    form.value = {
      ..._form,
      avatar: _raw.avatar.id,
      category: _raw.category.id,
      tags: _raw.tags.map((tag) => tag.name)
    }
    imageForm.value = _form.avatar

    client.writeQuery<Product, ProductVariables>({
      query: PRODUCT,
      variables: {
        filter: {
          slug: String(route.params.id)
        }
      },
      data: {
        product: data.value!.product
      }
    })
  }
}

const { mutate: createProduct } = useMutation<CreateProduct, CreateProductVariables>(CREATE_PROJECT)
const { mutate: updateProduct } = useMutation<UpdateProduct, UpdateProductVariables>(UPDATE_PRODUCT)

const publish = async () => {
  try {
    await formRef.value?.validate()
    if (!isEdit.value) {
      await createProduct({
        input: form.value
      })
    } else {
      const _currentPost = client.readQuery<Product, ProductVariables>({
        query: PRODUCT,
        variables: {
          filter: {
            slug: String(route.params.id)
          }
        }
      })
      if (_currentPost?.product) {
        await updateProduct({
          input: {
            ...form.value,
            id: _currentPost.product.id
          }
        })
      }
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
