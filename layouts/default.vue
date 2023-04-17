<template>
  <div class="flex h-screen w-full overflow-hidden bg-white p-5">
    <includes-sidebar id="sidebar" ref="sidebarRef" v-model:collapsed="collapsed" class="w-[200px] shrink-0" />
    <div class="w-full text-[#1b1944]">
      <includes-header ref="headerRef" />
      <div class="px-10 pr-0 pt-5">
        <div id="content" ref="bodyRef" class="scrollbar-hide overflow-y-auto">
          <nuxt-page />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const sidebarRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const bodyRef = ref<HTMLElement>()

const { height } = useWindowSize()
const { height: headerHeight } = useElementSize(headerRef)

const contentHeight = computed(() => `calc(${height.value}px - ${headerHeight.value}px - 1.25rem - 1.25rem - 1.25rem)`)

const anime = useAnime()
const [collapsed] = useToggle(true)
watch(
  collapsed,
  (value) => {
    anime({
      targets: '#sidebar',
      width: value ? [80, 200] : [200, 80]
    })
  })

</script>

<style scoped>
#content {
    height: v-bind(contentHeight);
}
</style>
