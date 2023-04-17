<template>
  <div class="bg-primary shadow-default shadow-primary-300 relative h-full rounded-xl py-7">
    <button
      class="text-primary-500 shadow-default absolute right-0 top-20 flex h-6 w-6 translate-x-1/2 items-center justify-center rounded-full bg-white transition"
      :class="{
        'translate-x-1/2': _collapsed,
        'translate-x-1/2 -rotate-180': !_collapsed
      }"
      @click="_collapsed = !_collapsed"
    >
      <Icon name="material-symbols:arrow-forward-ios-rounded" />
    </button>

    <h1 class="flex w-full items-center justify-center text-2xl font-semibold text-white">
      <span>Guen</span>
      <nuxt-img v-if="collapsed" src="/images/lgbt.png" width="25" class="ml-3" />
    </h1>

    <ul class="relative mt-16 flex h-full flex-col">
      <li v-for="item in menu" :key="item.title" class="mb-7">
        <nuxt-link
          :to="item.src"
          class="flex w-full items-center border-l-4 px-5 py-1 text-white hover:text-white"
          :class="{
            'justify-center': !collapsed,
            'border-l-transparent': !item.active.includes($route.name),
            'border-l-white': item.active.includes($route.name)
          }"
        >
          <Icon size="24" :name="item.icon" />
          <span v-if="collapsed" class="ml-3">{{ item.title }}</span>
        </nuxt-link>
      </li>

      <li class="mt-56 last:mb-0">
        <a class="flex w-full items-center border-l-4 border-transparent px-5 py-1 text-white">
          <Icon size="24" name="ic:round-keyboard-double-arrow-left" />
          <span v-if="collapsed" class="ml-3">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  collapsed: boolean
}>()

// define emits fpr v-model:collapsed
const emit = defineEmits<{
    (event: 'update:collapsed', value: boolean): void
}>()
const _collapsed = useVModel(props, 'collapsed', emit)

interface MenuItem {
  title: string
  src: string
  icon: string
  children?: MenuItem[]
  active: string[]
}
const menu = computed<MenuItem[]>(() => [
  {
    title: 'Overview',
    src: '/overview',
    icon: 'ri:home-smile-line',
    active: ['overview']
  },
  {
    title: 'Products',
    src: '/products',
    icon: 'iconoir:small-shop',
    active: ['products', 'creator-project']
  },
  {
    title: 'Categories',
    src: '/categories',
    icon: 'bx:category',
    active: ['categories']
  },
  {
    title: 'Blogs',
    src: '/blogs',
    icon: 'material-symbols:edit',
    active: ['blogs', 'blogs-id', 'creator-blog']
  },
  {
    title: 'Invoices',
    src: '/invoices',
    icon: 'solar:bag-5-bold',
    active: ['invoices']
  },
  {
    title: 'Users',
    src: '/users',
    icon: 'material-symbols:frame-person-outline-rounded',
    active: ['users']
  }
])

</script>

<style scoped>
h1 {
    font-family: 'Sacramento', cursive;
}
</style>
