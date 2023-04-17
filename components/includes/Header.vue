<template>
  <header class="flex items-center pl-10">
    <!--    <button v-if="history.length" class="mr-3" @click="goBack">-->
    <!--      <Icon name="ic:round-arrow-back" size="28" />-->
    <!--    </button>-->

    <h2 id="title" class="mb-0 mr-auto text-3xl font-semibold" />

    <div id="actions" />

    <button class="shadow-default ml-4 h-11 w-11 overflow-hidden rounded-full border-2 border-white">
      <nuxt-img src="/images/avatar.jpg" />
    </button>
  </header>
</template>

<script lang="ts" setup>

// save history route to array
// const history = ref<string[]>([])
//
// const router = useRouter()
//
// // push route to history array
// router.afterEach((_, from) => {
//   const _path = from.fullPath
//   // remove if path exist in array
//   if (history.value.includes(_path)) {
//     history.value = history.value.filter((path) => path !== _path)
//   }
//   history.value.push(_path)
// })
//
// const goBack = () => {
//   // go back to previous route
//   const _path = history.value[history.value.length - 1]
//   // remove from array
//   history.value = history.value.filter((path) => path !== _path)
//   router.back()
// }

</script>

<style scoped></style>
