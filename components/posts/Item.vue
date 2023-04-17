<template>
  <nuxt-link
    :to="{
      name: 'blogs-id',
      params: {
        id: post.slug
      }
    }"
    class="shadow-default flex overflow-hidden rounded-lg"
  >
    <div class="shadow-default shadow-primary-100 w-full max-w-[220px] shrink-0 overflow-hidden">
      <div
        class="aspect-w-6 aspect-h-4"
      >
        <nuxt-img :src="post.avatar.path" provider="backend" class="h-full w-full object-cover transition hover:scale-105" />
      </div>
    </div>

    <div class="mx-5 py-2.5">
      <h2 class="mb-0 text-[19px] font-semibold">
        {{ post.name }}
      </h2>

      <p class="mb-0 mt-1 line-clamp-3 text-[14px] text-gray-500">
        {{ post.description || '--' }}
      </p>

      <div class="mt-2 flex items-center">
        <div class="text-primary-600 text-[12px] font-semibold">
          {{ post.user.name }}
        </div>
        <div class="mx-3 h-[12px] w-[2px] rounded-lg bg-gray-400" />
        <div class="text-[12px] text-gray-400">
          {{ $dayjs(post.createdAt).fromNow() }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { Posts_posts } from '~/apollo/queries/__generated__/Posts'

defineProps<{
    post: Posts_posts
}>()
</script>

<style scoped></style>
