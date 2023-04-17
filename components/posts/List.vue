<template>
  <div>
    <posts-item v-for="post in posts" :key="post.id" :post="post" class="mb-7 last:mb-0" />
  </div>
</template>

<script lang="ts" setup>
import { Posts_posts } from '~/apollo/queries/__generated__/Posts'

defineProps<{
    posts: Posts_posts[]
}>()
</script>

<style scoped></style>
