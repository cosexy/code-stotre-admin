<template>
  <div>
    <products-item v-for="product in products" :key="product.id" :product="product" class="mb-7 last:mb-0" />
  </div>
</template>

<script lang="ts" setup>
import { Products_products } from '~/apollo/queries/__generated__/Products'

defineProps<{
    products: Products_products[]
}>()
</script>

<style scoped></style>
