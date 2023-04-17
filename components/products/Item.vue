<template>
  <nuxt-link
    :to="{
      name: 'blogs-id',
      params: {
        id: product.slug
      }
    }"
    class="shadow-default flex overflow-hidden rounded-lg"
  >
    <div class="shadow-default shadow-primary-100 relative w-full max-w-[220px] shrink-0 overflow-hidden">
      <div
        class="aspect-w-6 aspect-h-4 relative z-[1]"
      >
        <nuxt-img :src="product.avatar.path" provider="backend" class="h-full w-full object-cover transition hover:scale-105" />
      </div>

      <div
        v-if="product.category"
        class="from-primary-500 to-primary-600 shadow-default shadow-primary-200 absolute left-0 top-0 z-[2] rounded-br-lg bg-gradient-to-r px-2 py-1.5 text-[11px] font-semibold text-white"
      >
        {{ product.category.name }}
      </div>

      <!-- Bottom layer -->
      <div
        v-if="product.price"
        class="shadow-default absolute bottom-0 left-0 z-[2] rounded-tr-lg bg-gradient-to-r from-rose-500 to-rose-600 px-2 py-1.5 text-[11px] font-semibold text-white shadow-rose-200"
      >
        <span
          :class="{
            'line-through': product.sale
          }"
        >${{ product.price }}</span>

        <template v-if="product.sale">
          <span class="mx-1 text-[10px]">/</span>
          <span>${{ product.sale }}</span>
        </template>
      </div>
    </div>

    <div class="mx-5 py-2.5">
      <h2 class="mb-0 text-[19px] font-semibold">
        {{ product.name }}
      </h2>

      <p class="mb-0">
        <!-- tags -->
        <span
          v-for="tag in product.tags"
          :key="tag.id"
          class="mr-2 inline-block rounded-lg bg-gray-100 px-2 py-1 text-[12px] text-gray-500"
        >
          {{ tag.name }}
        </span>
      </p>

      <p class="mb-0 mt-1 line-clamp-2 text-[14px] text-gray-500">
        {{ product.description || '--' }}
      </p>

      <div class="mt-2 flex items-center">
        <div class="text-primary-600 text-[12px] font-semibold">
          {{ product.user.name }}
        </div>
        <div class="mx-3 h-[12px] w-[2px] rounded-lg bg-gray-400" />
        <div class="text-[12px] text-gray-400">
          {{ $dayjs(product.createdAt).fromNow() }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { Products_products } from '~/apollo/queries/__generated__/Products'

defineProps<{
    product: Products_products
}>()
</script>

<style scoped></style>
