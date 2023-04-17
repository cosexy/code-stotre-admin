<template>
  <div class="flex h-[300px] flex-wrap">
    <div class="flex h-full w-[250px] shrink-0 flex-col">
      <div
        v-for="(item, index) in indicator"
        :key="index"
        class="shadow-default mb-5 h-full rounded-xl bg-white px-6 py-5 last:mb-0"
      >
        <div class="text-xl font-semibold">
          {{ item.title }}
        </div>

        <div class="mt-4 flex items-center justify-evenly">
          <span class="text-3xl font-semibold">{{ item.value }}</span>

          <span
            class="shadow-default rounded px-2 py-1 text-xs"
            :class="{
              'bg-rose-100 text-rose-500 shadow-rose-200': item.growth < 0,
              'bg-green-100 text-green-500 shadow-green-200': item.growth >= 0
            }"
          >{{ item.growth }} %</span>
        </div>
      </div>
    </div>

    <client-only>
      <home-chart class="ml-8" />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
const indicator = computed(() => [
  {
    icon: 'solar:card-line-duotone',
    value: 54,
    title: 'New clients',
    growth: 10.12
  },
  {
    icon: 'solar:card-recive-line-duotone',
    value: 6,
    title: 'Invoices paid',
    growth: -8.75
  }
])
</script>

<style scoped></style>
