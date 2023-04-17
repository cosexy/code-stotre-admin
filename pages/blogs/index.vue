<template>
  <div>
    <includes-teleport to="#title">
      Blogs
    </includes-teleport>

    <includes-teleport to="#actions">
      <a-button type="primary" shape="round" @click="$router.push('/creator/blog')">
        Add New
      </a-button>
    </includes-teleport>

    <posts-list :posts="posts" class="mt-5 px-5" />
  </div>
</template>

<script lang="ts" setup>
import { GET_POSTS } from '~/apollo/queries/posts.query'
import { Posts, PostsVariables } from '~/apollo/queries/__generated__/Posts'

const filter = ref<PostsVariables>({
  filter: {
    name: '',
    sort: 'createdAt',
    limit: 10,
    offset: 0
  }
})
const debouncedFilter = refDebounced(filter, 500)

const { result } = useQuery<Posts, PostsVariables>(GET_POSTS, debouncedFilter)
const posts = computed(() => result.value?.posts || [])
</script>

<style scoped></style>
