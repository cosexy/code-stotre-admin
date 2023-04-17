<template>
  <div>
    <includes-teleport to="#title">
      {{ isEdit ? 'Edit post' : 'Create post' }}
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-popconfirm
        title="Are you sure delete this post?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="removeHandle"
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
        <a-form ref="formRef" :model="form" :rules="rules">
          <a-form-item name="name">
            <input
              v-model="form.name"
              type="text"
              class="_name text-[22px]"
              placeholder="Post name"
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

          <a-form-item name="content">
            <client-only>
              <lazy-editor-creator v-model:value="form.content" class="mt-7" />
            </client-only>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts" setup async>
import { FormInstance } from 'ant-design-vue/lib/form'
import { CREATE_POST, REMOVE_POST, UPDATE_POST } from '~/apollo/mutations/post.mutation'
import { CreatePost, CreatePostVariables } from '~/apollo/mutations/__generated__/CreatePost'
import { CreatePostInput } from '~/apollo/__generated__/serverTypes'
import { ImageEntity } from '~/apollo/queries/__generated__/ImageEntity'
import { GET_POST } from '~/apollo/queries/posts.query'
import { Post, PostVariables } from '~/apollo/queries/__generated__/Post'
import { UpdatePost, UpdatePostVariables } from '~/apollo/mutations/__generated__/UpdatePost'
import { RemovePost, RemovePostVariables } from '~/apollo/mutations/__generated__/RemovePost'

const form = ref<CreatePostInput>({
  name: '',
  description: '',
  content: {},
  avatar: ''
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
  ]
}))

const { client } = useApolloClient()
const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'blogs-id')

if (isEdit.value) {
  const { data } = await useAsyncQuery<Post>(GET_POST, {
    filter: {
      slug: String(route.params.id)
    }
  })
  if (data.value) {
    form.value = {
      name: data.value?.post.name,
      description: data.value?.post.description,
      content: data.value?.post.content,
      avatar: data.value?.post.avatar.id
    }
    imageForm.value = data.value?.post.avatar

    client.writeQuery<Post, PostVariables>({
      query: GET_POST,
      variables: {
        filter: {
          slug: String(route.params.id)
        }
      },
      data: {
        post: data.value?.post
      }
    })
  }
}

const { mutate: createPost, onDone: afterCreating } = useMutation<CreatePost, CreatePostVariables>(CREATE_POST)
afterCreating((payload) => {
  console.log(payload)
})

const { mutate: updatePost } = useMutation<UpdatePost, UpdatePostVariables>(UPDATE_POST)

const formRef = ref<FormInstance>()

const publish = async () => {
  try {
    await formRef.value?.validate()
    if (!isEdit.value) {
      await createPost({
        input: form.value
      })
    } else {
      const _currentPost = client.readQuery<Post, PostVariables>({
        query: GET_POST,
        variables: {
          filter: {
            slug: String(route.params.id)
          }
        }
      })
      if (_currentPost?.post) {
        await updatePost({
          input: {
            id: _currentPost?.post.id,
            ...form.value
          }
        })
      }
    }
  } catch (e) {
    //
  }
}

const mutationLoading = useMutationLoading()

const { mutate: removePost, onDone: afterRemoving } = useMutation<RemovePost, RemovePostVariables>(REMOVE_POST)
afterRemoving(async (res) => {
  // remove cache
  if (res.data?.removePost) {
    client.cache.evict({
      id: client.cache.identify({
        __typename: 'Post',
        id: res.data?.removePost.id
      })
    })
    await router.push({
      name: 'blogs'
    })
  }
})
const removeHandle = async () => {
  const _currentPost = client.readQuery<Post, PostVariables>({
    query: GET_POST,
    variables: {
      filter: {
        slug: String(route.params.id)
      }
    }
  })
  if (_currentPost?.post) {
    await removePost({
      input: {
        id: _currentPost?.post.id
      }
    })
  }
}
</script>

<style scoped>
._name {
    @apply w-full py-2.5 focus:outline-none border-b font-semibold pr-5 placeholder-gray-400 placeholder:font-normal
}
</style>
