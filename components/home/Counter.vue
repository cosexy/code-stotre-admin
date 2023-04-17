<template>
  <div id="counter" class="-mb-8 flex flex-wrap">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="shadow-default _item mb-8 mr-8 w-[250px] rounded-xl bg-white p-4 opacity-0 last:mr-0"
    >
      <div class="flex justify-between">
        <icon class="_icon" size="40" :name="item.icon" />

        <button>
          <Icon name="ph:dots-three-outline-vertical-fill" />
        </button>
      </div>

      <div class="mt-5 text-2xl font-semibold">
        {{ item.value }}
      </div>

      <div class="mt-3 text-sm opacity-60">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const data = computed(() => [
  {
    icon: 'solar:card-line-duotone',
    value: '$143,624',
    description: 'Total Earnings'
  },
  {
    icon: 'solar:card-recive-line-duotone',
    value: '$43,624',
    description: 'Pending Earnings'
  },
  {
    icon: 'solar:bag-4-line-duotone',
    value: 300,
    description: 'Products are selling'
  },
  {
    icon: 'ph:user-duotone',
    value: 130,
    description: 'Users are purchsed'
  }
])

const $anime = useAnime()
onMounted(() => {
  $anime({
    targets: '#counter ._item',
    opacity: [0, 1],
    translateX: [50, 0],
    delay: $anime.stagger(100)
  })
})
</script>

<style scoped>
._icon:deep(*[opacity]) {
    fill: #3b66f5;
    stroke: #3b66f5;
}
</style>
