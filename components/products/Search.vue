<template>
  <form>
    <div class="relative">
      <input
        v-model="_value.name"
        type="text"
        class="_name relative z-[1] bg-transparent text-[22px]"
        placeholder="Products name"
      >

      <div class="absolute left-0 top-1/2 z-[2] -translate-y-1/2 translate-x-3 opacity-60">
        <Icon name="ph:magnifying-glass-bold" class="text-gray-400" size="22" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { GetProductsFilter } from '~/apollo/__generated__/serverTypes'

const props = defineProps<{
  value: GetProductsFilter
}>()

// define emits fpr v-model:collapsed
const emit = defineEmits<{
  (event: 'update:value', value: GetProductsFilter): void
}>()
const _value = useVModel(props, 'value', emit)
</script>

<style scoped>
._name {
    @apply w-full pl-12 py-2 focus:outline-none border-b font-semibold pr-6 placeholder-gray-400 placeholder:font-normal
}
</style>
